"use client";
import { Colors } from "@/constants/colors";
import {
  Box,
  Button,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
  Select,
  Group,
  Badge,
  Avatar,
  FileInput,
  Notification,
} from "@mantine/core";
import { IconUser, IconStore, IconPhone, IconMail, IconMapPin, IconUpload, IconCheck, IconX } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";


const contractAddress = "0xYourContractAddressHere";

interface MerchantData {
  name: string;
  description: string;
  category: string;
  phone: string;
  email: string;
  address: string;
  walletAddress: string;
  isRegistered: boolean;
  logo?: File | null;
}

const MerchantProfile = () => {
  const [merchantData, setMerchantData] = useState<MerchantData>({
    name: "",
    description: "",
    category: "",
    phone: "",
    email: "",
    address: "",
    walletAddress: "",
    isRegistered: false,
    logo: null,
  });
  
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: "" });

  const categories = [
    { value: "food", label: "Food & Beverage" },
    { value: "retail", label: "Retail & Shopping" },
    { value: "services", label: "Services" },
    { value: "education", label: "Education" },
    { value: "entertainment", label: "Entertainment" },
    { value: "health", label: "Health & Wellness" },
  ];

  // Check if merchant is already registered
  useEffect(() => {
    const checkMerchantStatus = async () => {
      if (!merchantData.walletAddress || !ethers.utils.isAddress(merchantData.walletAddress)) return;

      try {
        setLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        
        // Fetch merchant data from contract
        const merchantInfo = await contract.getMerchantInfo(merchantData.walletAddress);
        
        if (merchantInfo.name && merchantInfo.name !== "") {
          setMerchantData(prev => ({
            ...prev,
            name: merchantInfo.name,
            description: merchantInfo.description || "",
            category: merchantInfo.category || "",
            phone: merchantInfo.phone || "",
            email: merchantInfo.email || "",
            address: merchantInfo.address || "",
            isRegistered: true,
          }));
        }
      } catch (err) {
        console.error("Error fetching merchant data:", err);
      } finally {
        setLoading(false);
      }
    };

    checkMerchantStatus();
  }, [merchantData.walletAddress]);

  const handleInputChange = (field: keyof MerchantData, value: any) => {
    setMerchantData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const { name, category, phone, email, walletAddress } = merchantData;
    
    if (!name || !category || !phone || !email || !walletAddress) {
      setNotification({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      return false;
    }

    if (!ethers.utils.isAddress(walletAddress)) {
      setNotification({
        type: 'error',
        message: 'Please enter a valid wallet address'
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setNotification({
        type: 'error',
        message: 'Please enter a valid email address'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      // Connect to wallet
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Register or update merchant
      const tx = await contract.registerMerchant(
        merchantData.walletAddress,
        merchantData.name,
        merchantData.description,
        merchantData.category,
        merchantData.phone,
        merchantData.email,
        merchantData.address
      );

      await tx.wait();

      setNotification({
        type: 'success',
        message: merchantData.isRegistered 
          ? 'Merchant profile updated successfully!' 
          : 'Merchant registered successfully!'
      });

      setMerchantData(prev => ({ ...prev, isRegistered: true }));
      
    } catch (err) {
      console.error("Error submitting merchant data:", err);
      setNotification({
        type: 'error',
        message: 'Failed to submit merchant data. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        handleInputChange('walletAddress', address);
      } else {
        setNotification({
          type: 'error',
          message: 'Please install MetaMask to connect your wallet'
        });
      }
    } catch (err) {
      console.error("Error connecting wallet:", err);
      setNotification({
        type: 'error',
        message: 'Failed to connect wallet'
      });
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
      <Group justify="space-between" align="center" mb="xl">
        <Text size="24px" fw="700" lts="-0.25px" color={Colors.primary}>
          Merchant Profile
        </Text>
        {merchantData.isRegistered && (
          <Badge color="green" size="lg" radius="md">
            <IconCheck size={14} style={{ marginRight: 4 }} />
            Registered
          </Badge>
        )}
      </Group>

      {/* Notification */}
      {notification.type && (
        <Notification
          color={notification.type === 'success' ? 'green' : 'red'}
          title={notification.type === 'success' ? 'Success' : 'Error'}
          onClose={() => setNotification({ type: null, message: "" })}
          mb="lg"
        >
          {notification.message}
        </Notification>
      )}

      <Stack gap="20px">
        {/* Logo Upload */}
        <Stack gap="6px">
          <Text fw="500">Business Logo</Text>
          <Group align="center" gap="md">
            <Avatar size="lg" radius="md">
              <IconStore size={24} />
            </Avatar>
            <FileInput
              placeholder="Upload logo"
              accept="image/*"
              leftSection={<IconUpload size={16} />}
              styles={{
                root: { flex: 1 },
                input: {
                  height: "45px",
                  borderColor: "#ced4da",
                  borderRadius: "10px",
                },
              }}
              onChange={(file) => handleInputChange('logo', file)}
            />
          </Group>
        </Stack>

        {/* Basic Information */}
        <Stack gap="6px">
          <Text fw="500">Business Name *</Text>
          <TextInput
            placeholder="Enter your business name"
            leftSection={<IconStore size={16} />}
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
          <Text fw="500">Business Description</Text>
          <Textarea
            placeholder="Describe your business..."
            minRows={3}
            styles={{
              input: {
                borderColor: "#ced4da",
                borderRadius: "10px",
              },
            }}
            value={merchantData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </Stack>

        <Stack gap="6px">
          <Text fw="500">Business Category *</Text>
          <Select
            placeholder="Select business category"
            data={categories}
            leftSection={<IconUser size={16} />}
            styles={{
              input: {
                height: "60px",
                borderColor: "#ced4da",
                borderRadius: "10px",
              },
            }}
            value={merchantData.category}
            onChange={(value) => handleInputChange('category', value)}
          />
        </Stack>

        {/* Contact Information */}
        <Stack gap="6px">
          <Text fw="500">Phone Number *</Text>
          <TextInput
            placeholder="+62 812 3456 7890"
            leftSection={<IconPhone size={16} />}
            styles={{
              input: {
                height: "60px",
                borderColor: "#ced4da",
                borderRadius: "10px",
              },
            }}
            value={merchantData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
        </Stack>

        <Stack gap="6px">
          <Text fw="500">Email Address *</Text>
          <TextInput
            placeholder="business@example.com"
            leftSection={<IconMail size={16} />}
            styles={{
              input: {
                height: "60px",
                borderColor: "#ced4da",
                borderRadius: "10px",
              },
            }}
            value={merchantData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </Stack>

        <Stack gap="6px">
          <Text fw="500">Business Address</Text>
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

        {/* Wallet Connection */}
        <Stack gap="6px">
          <Text fw="500">Wallet Address *</Text>
          <Group gap="xs">
            <TextInput
              placeholder="0x..."
              styles={{
                root: { flex: 1 },
                input: {
                  height: "60px",
                  borderColor: "#ced4da",
                  borderRadius: "10px",
                },
              }}
              value={merchantData.walletAddress}
              onChange={(e) => handleInputChange('walletAddress', e.target.value)}
            />
            <Button
              variant="outline"
              h="60px"
              px="md"
              onClick={connectWallet}
              color={Colors.primary}
            >
              Connect Wallet
            </Button>
          </Group>
        </Stack>

        {/* Exchange Rate Info */}
        <Box mt="20px">
          <Text size="12px" fw="500">
            Transaction Fee
          </Text>
          <Text size="14px" mt="8px" fw="600" color="gray">
            Campus Credit transactions: 0.1% fee
          </Text>
        </Box>

        {/* Submit Button */}
        <Button
          mt="20px"
          h="50px"
          radius="50px"
          color={Colors.primary}
          loading={loading}
          onClick={handleSubmit}
        >
          {merchantData.isRegistered ? 'Update Profile' : 'Register as Merchant'}
        </Button>

        {/* Registration Status */}
        {merchantData.isRegistered && (
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