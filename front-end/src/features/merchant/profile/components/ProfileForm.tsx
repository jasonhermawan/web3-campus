"use client";
import { Colors } from "@/constants/colors";
import { 
  Box, 
  Button, 
  Paper, 
  Stack, 
  Text, 
  TextInput
} from "@mantine/core";
import React, { useState } from "react";

const ProfileForm = () => {
  const [merchantName, setMerchantName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const handleSubmit = () => {
    if (!merchantName || !walletAddress) {
      alert("Please fill in all fields");
      return;
    }
    
    console.log("Merchant Name:", merchantName);
    console.log("Wallet Address:", walletAddress);
    
    // Here you would call the smart contract registerMerchant function
    // registerMerchant(walletAddress, merchantName)
  };

  return (
    <Paper
      radius="lg"
      p="xl"
      style={{
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Text size="24px" fw="700" lts="-0.25px" color={Colors.primary}>
        Merchant Profile
      </Text>
      
      <Stack mt="35px" gap="20px">
        <Stack gap="6px">
          <Text fw="500">Merchant Name</Text>
          <TextInput
            placeholder="Enter merchant name"
            styles={{
              input: {
                height: "60px",
                borderColor: "#ced4da",
                borderRadius: "10px",
              },
            }}
            value={merchantName}
            onChange={(e) => setMerchantName(e.target.value)}
          />
        </Stack>

        <Stack gap="6px">
          <Text fw="500">Wallet Address</Text>
          <TextInput
            placeholder="0x..."
            styles={{
              input: {
                height: "60px",
                borderColor: "#ced4da",
                borderRadius: "10px",
              },
            }}
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </Stack>


      </Stack>
    </Paper>
  );
};

export default ProfileForm;