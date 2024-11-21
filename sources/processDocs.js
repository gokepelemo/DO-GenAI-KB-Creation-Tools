#!/usr/bin/env node

import fs from 'fs';
import chalk from 'chalk';
import { processDoc } from  '../modules/processDoc.js';

if (process.argv.length < 6) {
  console.log("Usage: ./process-docs.js <file> <selector> <selector type: id, class, or tag> <spaces bucket>");
  process.exit(1);
}
const file = process.argv[2];
const selector = process.argv[3];
const selectorType = process.argv[4];
const bucket = process.argv[5];

const processFile = async (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const urls = fileContent.split('\n').filter(line => line.trim() !== '');

  for (const url of urls) {
    try {
      await processDoc(url, selector, selectorType, bucket);
      console.log(chalk.green(`Processed URL: ${url}`));
    } catch (error) {
      console.error(chalk.red(`Error processing URL ${url}:`, error));
    }
  }
};

processFile(file)
  .then(() => {
    console.log(chalk.green('All URLs processed successfully'));
  })
  .catch((error) => {
    console.error(chalk.red('Error processing file:', error));
    process.exit(1);
  });
