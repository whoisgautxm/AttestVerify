const { zkVerifySession, ZkVerifyEvents } = require('zkverifyjs');
const fs = require('fs');
require('dotenv').config();

async function executeVerificationTransaction(proofPath, publicSignalsPath) {
  // Read the binary files
  const proofData = fs.readFileSync(proofPath);
  const publicSignalsData = fs.readFileSync(publicSignalsPath);

  // Convert binary data to hex strings with 0x prefix
  const proofHex = '0x' + Buffer.from(proofData).toString('hex');
  const publicSignalsHex = '0x' + Buffer.from(publicSignalsData).toString('hex');

  // Start a new zkVerifySession on testnet
  const session = await zkVerifySession.start()
    .Testnet()
    .withAccount(process.env.SEED_PHRASE);

  // Execute the verification transaction
  const { events, transactionResult } = await session.verify().risc0()
    .waitForPublishedAttestation()
    .execute({
      proofData: {
        vk: "0xb38b8dff12a643b6bf185a6dcfb0427d7c2a5e2eb10b7de07d02f0c0209ee609",
        proof: proofHex,
        publicSignals: publicSignalsHex
      }
    });

  // Listen for the 'includedInBlock' event
  events.on(ZkVerifyEvents.IncludedInBlock, (eventData) => {
    console.log('Transaction included in block:', eventData);
    // Handle the event data as needed
  });

  // Listen for the 'finalized' event
  events.on(ZkVerifyEvents.Finalized, (eventData) => {
    console.log('Transaction finalized:', eventData);
    // Handle the event data as needed
  });

  // Handle errors during the transaction process
  events.on('error', (error) => {
    console.error('An error occurred during the transaction:', error);
  });

  try {
    // Await the final transaction result
    const transactionInfo = await transactionResult;

    // Log the final transaction result
    console.log('Transaction completed successfully:', transactionInfo);
  } catch (error) {
    // Handle any errors that occurred during the transaction
    console.error('Transaction failed:', error);
  } finally {
    // Close the session when done
    await session.close();
  }
}

// File paths
const proofPath = "/Users/shivanshgupta/Desktop/AttestVerify/inner.bin";
const publicSignalsPath = "/Users/shivanshgupta/Desktop/AttestVerify/journal.bin";

// Execute the transaction
executeVerificationTransaction(proofPath, publicSignalsPath);
