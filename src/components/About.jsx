import React from "react";

const About = () => {
  return (
    <div
      className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4  text-white"
      style={{ backgroundColor: "#221C35" }}
    >
      {/* About Us Section */}
      <div className="flex flex-col justify-center gap-8">
        <h1 className="text-3xl lg:text-4xl font-bold leading-9 pb-4">
          About Us
        </h1>
        <p className="font-normal text-base leading-6">
          At SecuredBlocks.io, we are dedicated to transforming the landscape of
          healthcare data security through cutting-edge technology and
          innovative solutions. With a deep understanding of the critical
          challenges posed by healthcare data breaches, disorganized medical
          record storage, and data fraud, we have pioneered a groundbreaking
          platform that leverages the power of Blockchain technology. Our
          mission is simple yet profound: to empower individuals with complete
          control over their medical information while ensuring its utmost
          security and privacy. We believe that every individual deserves the
          assurance that their sensitive healthcare data is not only safeguarded
          but also easily accessible when needed the most. Through our platform,
          we introduce a revolutionary concept – a single, unique medical ID
          that acts as a secure repository for all your medical records,
          reports, and prescriptions. This information is stored in a
          decentralized manner using the tamper-proof and immutable properties
          of Non-Fungible Tokens (NFTs) on the Blockchain. This not only ensures
          the highest level of data integrity but also eliminates the risks
          associated with unauthorized access and tampering.
        </p>
      </div>

      {/* Large Image */}
      <div className="pt-12">
        <img
          className="w-full h-full"
          src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
          alt="A group of People"
        />
      </div>

      {/* Our Goal Section */}
      <div className="flex flex-col justify-center gap-8 pt-12">
        <h1 className="text-5xl lg:text-5xl font-bold leading-9 pb-8">
          Our Goals :{" "}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Empowering Patients */}
          <div className="bg-white p-6 rounded-lg shadow-md text-black">
            <h2 className="text-xl font-semibold mb-3">Empowering Patients</h2>
            <p className="text-base">
              We believe that patients should have complete ownership and
              control over their medical data. Our platform empowers individuals
              to manage access permissions, granting selective authorization to
              healthcare providers and specialists as needed.
            </p>
          </div>

          {/* Elevating Data Security */}
          <div className="bg-white p-6 rounded-lg shadow-md text-black">
            <h2 className="text-xl font-semibold mb-3">
              Elevating Data Security
            </h2>
            <p className="text-base">
              By harnessing the power of Blockchain technology, we establish an
              unbreakable shield against data breaches and fraud. Every piece of
              information stored within our platform is encrypted,
              decentralized, and tamper-proof, ensuring the highest level of
              data security.
            </p>
          </div>

          {/* Enhancing Collaboration */}
          <div className="bg-white p-6 rounded-lg shadow-md text-black">
            <h2 className="text-xl font-semibold mb-3">
              Enhancing Collaboration
            </h2>
            <p className="text-base">
              We recognize the importance of seamless collaboration between
              patients, hospitals, doctors, and medical practitioners. Our
              platform facilitates secure information sharing, enabling
              efficient and effective healthcare services while preserving
              privacy controls.
            </p>
          </div>

          {/* Streamlining Healthcare Operations */}
          <div className="bg-white p-6 rounded-lg shadow-md text-black">
            <h2 className="text-xl font-semibold mb-3">
              Streamlining Healthcare Operations
            </h2>
            <p className="text-base">
              Our solution goes beyond data security; it also aims to enhance
              operational efficiency for healthcare providers. With organized
              and easily accessible medical records, healthcare professionals
              can make informed decisions and deliver personalized care more
              effectively.
            </p>
          </div>

          {/* Pioneering Patient-Centric Healthcare */}
          <div className="bg-white p-6 rounded-lg shadow-md text-black">
            <h2 className="text-xl font-semibold mb-3">
              Pioneering Patient-Centric Healthcare
            </h2>
            <p className="text-base">
              We are at the forefront of driving a paradigm shift towards
              patient-centric healthcare. By placing control back into the hands
              of individuals, we foster trust, transparency, and accountability
              within the healthcare ecosystem.
            </p>
          </div>
        </div>
      </div>

      {/* Profiles Section */}
      <div className="flex flex-col justify-center gap-4 pt-10">
        <h1 className="text-3xl lg:text-4xl font-bold leading-9 pb-4">
          Our Team
        </h1>
        <div className="overflow-x-auto">
          <div className="flex md:gap-3 gap-2">
            {/* Individual Profile */}

            {/* -----------------    Animesh Kaushik  -------------------- */}
            <div className="aboutcard">
            <div className="img">
    <img src="./images/animesh.jpg" alt="Profile Image"className="rounded-img"  />
  </div>
              <span>Animesh Kaushik </span>
              <span>
                <i>Mentor</i>
              </span>

              <p className="info">
                Research Analyst since 2021. Worked on helping with the right
                strategy for asset tokenization by banks. Mapped CBDC
                implementation in G20 countries. Helped devise market strategy
                and competitive analysis for a gamefi and metaverse firms.
              </p>
              <div className="share">
                <a href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                </a>
                <a href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                  </svg>
                </a>
              </div>
              <button>Connect</button>
            </div>

            {/* ----------  Soumyabrata Ghosh -------- */}

            <div className="aboutcard">
            <div className="img">
    <img src="./images/soumya.jpg" alt="Profile Image" className="rounded-img" />
  </div>
              <span>Soumyabrata Ghosh</span>
              <span>
                <i>CEO</i>
              </span>
              <p className="info">
                Into web development since 2020, and transitioned into
                Blockchain Technology in 2021. Has experience in building web2,
                web3 applications. Actively participating in blockchain, DeFi,
                and programming events. Verified member of KaratDAO, DefiEdge
                and many more.
              </p>
              <div className="share">
                <a href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                </a>
                <a href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                  </svg>
                </a>
              </div>
              <button>Connect</button>
            </div>
            {/* --------------   HAri Pandey ----------------- */}
            <div className="aboutcard">
            <div className="img">
    <img src="./images/hari.jpg" alt="Profile Image" className="rounded-img"  />
  </div>              <span>Hari Pandey</span>
              <span>
                <i>CTO</i>
              </span>
              <p className="info">
                Blockchain Since 2022. 1 + year experience in Web3
                world.Experience in building Dapps and designing smart
                contracts.His passion for the blockchain world and its
                continuous innovation drives his dedication to this field.
              </p>
              <div className="share">
                <a href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                </a>
                <a href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                  </svg>
                </a>
              </div>
              <button>Connect</button>
            </div>
          </div>
          <br />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-15 pt-22">
        <h1 className="text-3xl lg:text-4xl font-bold leading-9 pb-4"></h1>
        <div className="overflow-x-auto">
          <div className="flex md:gap-3 gap-2">
            {/* Individual Profile */}
            {/* -----   Karmabir Brahma ----------------- */}
            <div className="aboutcard">
            <div className="img">
    <img src="./images/karmabir.jpg" alt="Profile Image" className="rounded-img" />
  </div>
              <span>Karmabir Brahma</span>
              <span>
                <i>C00</i>
              </span>
              <p className="info">
                Into programming since 2020, started coding club for the College
                and dived into Blockchain in 2022. Continuously seeking
                knowledge in Blockchain field and other technologies.
              </p>
              <div className="share">
                <a href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                </a>
                <a href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                  </svg>
                </a>
              </div>
              <button>Connect</button>
            </div>
            {/* -----------------  Arpita deka  ---------------- */}
            <div className="aboutcard">
            <div className="img">
    <img src="./images/arpita.jpg" alt="Profile Image" className="rounded-img" />
  </div>
              <span>Arpita deka </span>
              <span>
                <i>CMO</i>
              </span>
              <p className="info">
                Been a student of management from past 2 years with a eagar to
                run something which can add value to someone’s life . Keen
                believer of web3 technology . Served company named
                Luster.network as a web3 marketer for 6 months and understood
                different aspects of marketing when it comes to Web3.
              </p>
              <div className="share">
                <a href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                </a>
                <a href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                  </svg>
                </a>
              </div>
              <button>Connect</button>
            </div>
            {/* ------ Nived Gop p   --------- */}
            <div className="aboutcard">
            <div className="img">
    <img src="./images/nived.jpg" alt="Profile Image" className="rounded-img" />
  </div>
              <span>Nived Gop p </span>
              <span>
                <i>CFO</i>
              </span>
              <p className="info">
                Web 3 enthusiast,In web3 from 2021.Chapter lead of The phoenix
                guild ,The product house.Worked as ambassadors of push protocol,
                wazirx , Near India.
              </p>
              <div className="share">
                <a href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                </a>
                <a href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                  </svg>
                </a>
              </div>
              <button>Connect</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
