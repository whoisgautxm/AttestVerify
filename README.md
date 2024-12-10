# AttestVerify - One stop solution for all privacy preserving solutions 

## Updated Demo video (with ZkVerify Integrated) - [https://youtu.be/cZUNZNA57K8]

## How it works -
The *AttestVerify* uses cryptographic standards and zero-knowledge proofs (ZKP) to ensure secure and verifiable claims while maintaining user privacy.

---

## **Workflow**

### **1. Attestation Creation**
1. A reputable identity authority generates an attestation.  
   - Example: Confirming a person’s date of birth.
2. The attestation is digitally signed using **EIP712**, ensuring a tamper-proof and structured signature.
3. Attestation data is encoded within a **URL**, preserving privacy while being accessible for verification.

---

### **2. Zero-Knowledge Proof Generation**
1. The system employs **RISC0 ZKVM** to validate the attestation's integrity without exposing the actual data.
2. The ZKVM re-generates the **EIP712 signature** by calculating:
   - **DomainHash**
   - **MessageHash**  
   This confirms the attestation is untampered.
3. It checks specific conditions, such as verifying if the individual's date of birth shows they are above 18.
4. This proof can be used anywhere where you want to prove that you are 18+ without actually revealing your actual Date of Birth.

---

### **3. Verification and Proof Upload**
1. The **ZKP** produced by **RISC0 ZKVM** is submitted to the **zkVerify Blockchain**, built on the **Substrate framework**.
2. Specialized verifier pallets on zkVerify validate the proof quickly and efficiently.

---

### **4. Blockchain Integration**
1. Verified proofs are stored immutably on the zkVerify blockchain.  
   - These proofs are publicly accessible through APIs or blockchain explorers.
2. Periodically, proofs are aggregated and deployed on multiple EVM-compatible testnets, such as **Ethereum Sepolia**, ensuring broader compatibility.

---

## **Key Advantages**
### **1. Privacy-Preserving Verification**  
Users can prove they meet specific conditions (e.g., being over 18) without disclosing sensitive details.

### **2. Immutable and Decentralized Trust**  
The zkVerify blockchain ensures verified proofs are transparent and tamper-resistant.

### **3. Interoperability**  
Compatibility with EVM networks like **Ethereum** and **Base** expands the system's usability.

--- 

## Challenges we ran into- 
1. We faced a lot of issue with the versoning of Risc0 , because for the ZkVerify we need Risc0 v1.0.1 which is not supported  by Risc0 now. 
2. Sat with Daniele and Rolf for 3+ hours and finally after 100+ iterations , we were finally able to run the code succesfully with both polkadotjs and ZkVerify SDK.



## **Future Roadmap**

1. **Enhance Frontend and User Experience**  
   - Develop an intuitive and user-friendly interface to streamline workflows and ensure a seamless user experience.

2. **Expand to Additional Proof Types**  
   - Enable the generation of zero-knowledge proofs (ZKPs) for diverse use cases, such as:  
     - **Bank Balance Proofs:** Verifying that a user’s bank balance exceeds a specific threshold without revealing the actual balance.  
     - **Credit Score Proofs:** Proving a credit score falls within a specified range while maintaining privacy.

3. **Broaden Applications**  
   - Extend functionality to include proofs for:  
     - **Citizenship Verification:** Privacy-preserving attestations of citizenship for various legal and governmental processes.  
     - **Ownership Claims:** Proofs of asset ownership that can be applied to real estate, vehicles, and more.

4. **Integrate with Broader Ecosystems**  
   - Explore partnerships and integrations with identity verification platforms, financial institutions, and decentralized identity networks to widen the system's impact and adoption.


## How to run this project locally - 
1. In the `host` code folder  change the input.json which the attesation you want to generate proof of (You can make an attesation with same schema here - [EAS])
2. Run `cargo run -r` to generate the ZKP using Risc0 ZKVM
3. `cd zkverifyJs` and run `node index.js` to run the ZkVerify SDK which then sends the proof to ZkVerify Blockchain and verifies the ZKP

[EAS]:https://sepolia.easscan.org/schema/view/0xe102b6f4e9491f87a8ca24a7bb9ccab0bdbc57cc2d58dacc38295c349f17542e
   
