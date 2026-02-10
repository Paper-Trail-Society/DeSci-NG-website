'use client'
import React from 'react'
import { motion } from "motion/react";
import { Text } from '../ui/text';
import PaperSearchInput from '../shared/paper-search-input';

const HeroSection = () => {
  return (
    <motion.section
            className="md:w-3/5 w-full mx-auto my-7 md:my-6 space-y-6 px-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Text
                weight={"bold"}
                as='h1'
                className="text-center leading-6 text-3xl font-semibold"
              >
                EXPLORE ACADEMIC PAPERS ACROSS DISCIPLINES
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 }}
            >
              <PaperSearchInput />
            </motion.div>
          </motion.section>
  )
}

export default HeroSection