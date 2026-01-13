"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { Text } from "../ui/text";

const categories = [
  {
    name: "Applied Science",
    tagline: "Discover papers in Biology, Chemistry, and more",
    query: "science",
    imageUrl: "/assets/applied-science.png",
  },
  {
    name: "Arts & Humanities",
    query: "arts",
    tagline: "Discover papers in Literature, Performing Arts, and more",
    imageUrl: "/assets/art-and-humanities.png",
  },
  {
    name: "Blockchain Technology",
    query: "blockchain",
    tagline: "Discover papers in Distributed Ledger, Crypto, and more",
    imageUrl: "/assets/blockchain-tech.png",
    imageWidth: 250, // Adjust this if it looks bigger
    imageHeight: 160, // Adjust this if it looks bigger (e.g., taller)
  },
  {
    name: "Medical Science",
    query: "medicine",
    tagline: "Discover papers in Cardiology, Anatomy, and more",
    imageUrl: "/assets/medical-science.png",
  },
];

const CategoriesSection = () => {
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-6 items-center justify-center w-full">
      {categories.map((category, idx) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: idx * 0.15 }}
          className="flex flex-col gap-2 lg:w-1/4 md:w-1/3 w-4/5 h-full shadow-md transition-shadow hover:shadow-xl rounded-lg bg-transparent"
        >
            <Link href={`/search?q=${category.query}`} className="block">
              <CardHeader className="p-0">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  width={category.imageWidth || 250}
                  height={category.imageHeight || 150}
                  className="object-cover w-full rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="space-y-1 p-4">
                <CardTitle className="text-lg font-semibold">
                  {category.name.toUpperCase()}
                </CardTitle>
                <CardDescription>
                  <Text size={"sm"} variant={"secondary"} className="text-wrap">
                    {category.tagline}
                  </Text>
                </CardDescription>
              </CardContent>
            </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoriesSection;
