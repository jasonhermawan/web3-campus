"use client";
import { Colors } from "@/constants/colors";
import {
  Box,
  Button,
  Paper,
  Stack,
  Text,
  TextInput,
  Group,
  Badge,
  Avatar,
  FileInput,
} from "@mantine/core";
import { IconUser, IconBuilding, IconMapPin, IconUpload, IconCheck } from "@tabler/icons-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import contractABI from "@/constants/abi/CampusCreditABI.json";

import {
  useAccount,
  useWriteContract,
 
} from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { Config } from "@wagmi/core";
import { contracts } from "@/constants/contracts";

const merchantContract = {
  address: contracts.campusCredit.address as `0x${string}`,
   abi: contracts.abi,
};

interface MerchantData {
  name: string;
  address: string;
}

const MerchantProfile = () => {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  
  const [merchantData, setMerchantData] = useState<MerchantData>({
    name: "",
    address: "",
  });

  const categories = [
    { value: "food", label: "Food & Beverage" },
    { value: "retail", label: "Retail & Shopping" },
    { value: "services", label: "Services" },
    { value: "education", label: "Education" },
    { value: "entertainment", label: "Entertainment" },
    { value: "health", label: "Health & Wellness" },
  ];

  const handleInputChange = (field: keyof MerchantData, value: any) => {
    setMerchantData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const { name, address } = merchantData;
    
    if (!name) {
      toast.error("Please enter a business name", {
        style: {
          borderRadius: "12px",
          fontFamily: "Inter, sans-serif",
        },
      });
      return false;
    }

    if (!address) {
      toast.error("Please enter a business address", {
        style: {
          borderRadius: "12px",
          fontFamily: "Inter, sans-serif",
        },
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!isConnected) return;
    if (!validateForm()) return;

    setIsLoading(true);

    toast.loading("Processing registration...", {
      style: {
        background: Colors.primary,
        color: "white",
        borderRadius: "12px",
        fontFamily: "Inter, sans-serif",
      },
    });

    try {
      const result = await writeContractAsync({
        ...merchantContract,
        functionName: "registerMerchant",
        args: [
          address as `0x${string}`,
          merchantData.name,
          merchantData.address
        ],
        account: address as `0x${string}`,
      });

      toast.dismiss();
      toast.loading("Confirming registration...", {
        style: {
          background: Colors.primary,
          color: "white",
          borderRadius: "12px",
          fontFamily: "Inter, sans-serif",
        },
      });

      const config = getConfig();
      await waitForTransactionReceipt(config, {
        hash: result as `0x${string}`,
      });

      toast.dismiss();
      toast.success("Merchant registered successfully!", {
        style: {
          borderRadius: "12px",
          fontFamily: "Inter, sans-serif",
        },
      });

      setIsRegistered(true);
      
    } catch (error) {
      console.error("Registration failed:", error);
      toast.dismiss();
      toast.error("Registration failed. Please try again.", {
        style: {
          borderRadius: "12px",
          fontFamily: "Inter, sans-serif",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper
      radius="lg"
      p="xl"
      style={{
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Header */}
      <Group justify="space-between" align="center" mb="35px">
        <Text size="24px" fw="700" lts="-0.25px" color={Colors.primary}>
          Merchant Profile
        </Text>
        {isRegistered && (
          <Badge color="green" size="lg" radius="md">
            <IconCheck size={14} style={{ marginRight: 4 }} />
            Registered
          </Badge>
        )}
      </Group>

      <Stack gap="20px">
        {/* Basic Information */}
        <Stack gap="6px">
          <Text fw="500">Business Name *</Text>
          <TextInput
            placeholder="Enter your business name"
            leftSection={<IconBuilding size={16} />}
            styles={{
              input: {
                height: "60px",
                borderColor: "#ced4da",
                borderRadius: "10px",
              },
            }}
            value={merchantData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </Stack>

        <Stack gap="6px">
          <Text fw="500">Business Address *</Text>
          <TextInput
            placeholder="Enter your business address"
            leftSection={<IconMapPin size={16} />}
            styles={{
              input: {
                height: "60px",
                borderColor: "#ced4da",
                borderRadius: "10px",
              },
            }}
            value={merchantData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />
        </Stack>

        {/* Information Note */}
        <Box mt="20px">
          <Text size="12px" fw="500">
            Registration Note
          </Text>
          <Text size="14px" mt="8px" fw="600" color="gray">
            Business name and address are required for merchant registration
          </Text>
        </Box>

        {/* Submit Button */}
        <Button
          mt="20px"
          h="50px"
          radius="50px"
          color={Colors.primary}
          loading={isLoading}
          onClick={handleSubmit}
        >
          Register as Merchant
        </Button>

        {/* Registration Status */}
        {isRegistered && (
          <Box mt="10px" p="md" style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
            <Text size="sm" fw="500" color="green">
              ✅ Your merchant account is active and ready to accept Campus Credit payments
            </Text>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default MerchantProfile;