# The Flying Bus

A kid-friendly news platform with crypto rewards. This platform allows kids to write articles, engage with content, and earn TFB tokens for their contributions.

## Features

- User roles (kids, moderators, admin)
- Article writing and moderation
- Commenting system
- TFB token rewards
- Parental consent system
- Reward redemption shop

## Tech Stack

- **Frontend**: Next.js + Tailwind CSS
- **Backend**: Firebase (Authentication & Firestore)
- **Blockchain**: Polygon + Thirdweb
- **Wallet**: Magic.link for email-based login

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your configuration:
   ```
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

   # Magic.link Configuration
   NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY=your_magic_publishable_key

   # Web3 Configuration
   NEXT_PUBLIC_TFB_TOKEN_CONTRACT=your_token_contract_address
   NEXT_PUBLIC_POLYGON_RPC_URL=your_polygon_rpc_url
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/            # React components
│   ├── auth/             # Authentication components
│   └── ...
├── lib/                  # Utility functions and configurations
│   ├── firebase.ts      # Firebase configuration
│   └── web3.ts         # Web3 configuration and functions
└── types/               # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

## Safety and Compliance

This platform prioritizes child safety and complies with relevant regulations:

- Parental consent required for kids under 18
- Content moderation by verified moderators
- Safe wallet implementation with Magic.link
- Reward redemption with parental approval 

-----------------------
Scope of Work (SOW)
Project Name: The Flying Bus (TFB)
Client/Organization: TheFlyingBus.org
Date: April 15, 2025

Project Overview
The Flying Bus (TFB) is a kid-powered digital newspaper platform designed for children to write, comment, and participate in events—earning crypto rewards (TFB tokens) for their contributions. Built with safety, education, and engagement in mind, the project will promote creativity, digital literacy, and financial education while remaining compliant with COPPA/GDPR standards.

Project Objectives
Empower kids to publish content in a fun and safe environment.


Implement a gamified reward system using TFB crypto tokens.


Ensure platform safety and compliance with child data regulations.


Provide a seamless user experience through email-based logins and custodial wallets.


Offer value and real-world utility through a redemption system.



Deliverables by Phase

Phase 1: MVP – Basic Website
Frontend
Responsive Landing Page


Overview of the platform: “News by Kids, Rewards in Crypto”


Email signup form for early access


Dashboard Pages


User profile (Username, TFB balance)


Content submission form for articles


Comment functionality on existing posts


Backend
Firebase/Supabase Integration


User authentication (basic auth or email-based)


Firestore/Postgres DB for storing submissions and token records


Content Moderation
Admin/Moderator role setup


Admin dashboard for content approval


Comment filtering and reporting system


Reward System (Off-chain)
Internal logic to allocate TFB points:


5 TFB per article


3 TFB per event participation


1 TFB per comment



Phase 2: Crypto Integration
Blockchain
Deploy TFB Token


ERC-20 token deployed on Polygon using Thirdweb


Token contract ownership retained by admin wallet


Wallet Integration
Magic.Link Integration


Email-based custodial wallet system


Kid users get a wallet tied to their email (invisible to them)


Reward Distribution
Use Thirdweb SDK or smart contract scripts


Automate TFB distribution to wallets after content approval



Phase 3: Redemption & Safety Layer
Reward Shop
TFB Redemption Options:


Digital goods (books, gift cards via Tremendous API)


Token donation to charity (e.g., Save the Children, UNICEF)


Parental Controls
Parental consent workflow:


Email-based parental verification for wallet withdrawals or redemptions


Dashboard for parents to approve token use



Compliance & Safety
Data handling in line with COPPA/GDPR


Anonymized usernames only


Clear Terms of Use and Privacy Policy


Consent forms and opt-ins for crypto-related features



Technology Stack
Component
Tech Stack
Frontend
Next.js (React), Tailwind CSS
Backend
Firebase or Supabase
Blockchain
Polygon (via Thirdweb)
Wallet System
Magic.Link (custodial wallets)
Hosting
Vercel or Netlify
Payment/Gifting
Tremendous API
-----------------------------
Creating *The Flying Bus (theflyingbus.org)—a kid-friendly news platform with crypto rewards—is an exciting project! Below is a **step-by-step guide* to help you build it efficiently.

---

### *Step 1: Define Core Features*
1. *User Roles*  
   - Kids (writers, commenters, event participants)  
   - Moderators (adults/teachers overseeing content)  
   - Admin (manages rewards, content approval)  

2. *Reward System*  
   - *TFB Tokens* (ERC-20 on Polygon for low fees)  
     - Article = 5 TFB  
     - Comment = 1 TFB  
     - Event Participation = 3 TFB  
   - *Redemption Options*:  
     - Digital gifts (games, books)  
     - Donate to charities  
     - Convert to fiat (via parental approval)  

3. *Safety & Compliance*  
   - COPPA/GDPR compliance (no personal data collection)  
   - Parental consent for crypto features  

---

### *Step 2: Choose Tech Stack*
| Component | Recommendation |
|-----------|---------------|
| *Frontend* | Next.js (React) + Tailwind CSS |
| *Backend* | Firebase (Auth + DB) or Supabase |
| *Blockchain* | Polygon (low fees) + Thirdweb (easy token mgmt) |
| *Wallet Solution* | Magic.Link (email-based logins) |
| *Hosting* | Vercel (for Next.js) or Netlify |

---

### *Step 3: Development Phases*
#### *Phase 1: MVP (Basic Website)*
1. *Landing Page*  
   - Explain the concept ("News by Kids, Rewards in Crypto")  
   - Signup for early access (collect emails)  

2. *User Dashboard*  
   - Profile page (username, earned TFB)  
   - Submission form for articles/comments  

3. *Reward Tracking*  
   - Firebase DB to track off-chain TFB balances  

#### *Phase 2: Crypto Integration*
1. *Deploy TFB Token*  
   - Use *Thirdweb* to create an ERC-20 token on Polygon.  
   - Example contract: [Thirdweb Token Tool](https://thirdweb.com/)  

2. *Custodial Wallets*  
   - Integrate *Magic.Link* for seamless logins.  
   - Kids get an "invisible" wallet tied to their email.  

3. *Reward Distribution*  
   - Automate TFB payouts via *Thirdweb SDK* when kids submit content.  

#### *Phase 3: Redemption & Safety*
1. *Reward Shop*  
   - Exchange TFB for gift cards (Amazon, Roblox) via *Tremendous API*.  
   - Option to donate tokens to charities.  

2. *Parental Controls*  
   - Require parent email verification for withdrawals.  

---

### *Step 4: Launch & Grow*
1. *Beta Testing*  
   - Invite schools/kid communities to test.  
   - Use *Hotjar* for feedback.  

2. *Marketing*  
   - Partner with educators (e.g., TeachersPayTeachers).  
   - TikTok/YouTube ads (target parents/kids 8-14).  

3. *Future Features*  
   - NFT badges for top contributors.  
   - DAO for kid-led voting on site rules.