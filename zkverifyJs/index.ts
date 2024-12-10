import { zkVerifySession, ZkVerifyEvents, TransactionStatus, VerifyTransactionInfo } from 'zkverifyjs';
import fs from 'fs';

function readBinaryFileAsHex(filePath: string): string {
  try {
    const binaryData = fs.readFileSync(filePath);
    return binaryData.toString('hex');
  } catch (error) {
    console.error(`Error reading binary file at ${filePath}:`, error);
    throw error;
  }
}

async function executeVerificationTransaction(proof: string, publicSignals: string) {
  try {
    const session = await zkVerifySession.start()
      .Testnet()
      .withAccount('afford scale strong common joy concert hidden pudding screen cube pistol member');

    const vk = JSON.stringify({
      data: "0x08a9392f35604b39a54aa44a317ad0aa7cfd685dca492f3d8bfc1e03f8f98b70"
    });

    // Register verification key
    const registration = await session.registerVerificationKey().fflonk().execute(vk);
    
    // Execute verification
    const { events, transactionResult } = await session.verify().risc0()
      .waitForPublishedAttestation()
      .execute({ 
        proofData: {
          vk: vk,
          proof: proof,
          publicSignals: publicSignals 
        }
      });

    events.on(ZkVerifyEvents.IncludedInBlock, (eventData) => {
      console.log('Transaction included in block:', eventData);
    });

    events.on(ZkVerifyEvents.Finalized, (eventData) => {
      console.log('Transaction finalized:', eventData);
    });

    const transactionInfo = await transactionResult;
    console.log('Transaction completed successfully:', transactionInfo);
  } catch (error) {
    console.error('Transaction failed:', error);
  }
}

const proofPath = "/home/whoisgautxm/Desktop/Attestverify/inner.bin";
const proof = '0x' + readBinaryFileAsHex(proofPath);
const publicSignals = "0xc0000000000000002a0000003078373234326363633330643638666361356364386165666330666662623534356131383034343339660000009fd521000000003fa3586700000000e581fe66000000002a0000003078653732616130663537663163643566666166316435373765626635393430633636613139663235340000420000003078623064393063366137306333303362623163306630633532356663653934373364643664653937303935306166303130623066343865636666333762616637330000";

executeVerificationTransaction(proof, publicSignals);