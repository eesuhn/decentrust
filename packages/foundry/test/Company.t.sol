// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../contracts/Company.sol";

contract CompanyTest is Test {
    Company company;
    address owner = address(0x1);
    address applicant = address(0x2);
    address user1 = address(0x3);

    function setUp() public {
        vm.prank(owner);
        company = new Company(owner, "CompanyPublicKey");
    }

    function testCreateJobListing() public {
        vm.prank(owner);
        company.createJobListing("Job Title", "Job Description");

        Company.JobListing memory job = company.getJobListing(1);
        assertEq(job.id, 1);
        assertEq(job.title, "Job Title");
        assertEq(job.description, "Job Description");
        assertTrue(job.isActive);
    }

    function testSubmitApplication() public {
        vm.prank(owner);
        company.createJobListing("Job Title", "Job Description");

        vm.prank(applicant);
        company.submitApplication(1, "EncryptedCID", Company.Gender.Female);

        Company.Application memory app = company.getApplication(1);
        assertEq(app.applicant, applicant);
        assertEq(app.jobId, 1);
        assertEq(app.encryptedDataCID, "EncryptedCID");
        assertEq(uint256(app.status), uint256(Company.ApplicationStatus.Applied));
        assertEq(uint256(app.gender), uint256(Company.Gender.Female));
    }

    function testFullApplicationFlow() public {
        // Company creates a job listing
        vm.prank(owner);
        company.createJobListing("Software Engineer", "Develop smart contracts");

        // Applicant submits an application
        vm.prank(applicant);
        company.submitApplication(1, "EncryptedCID", Company.Gender.Female);

        // Verify initial application status
        Company.Application memory app = company.getApplication(1);
        assertEq(uint256(app.status), uint256(Company.ApplicationStatus.Applied));

        // Company gives assessment
        vm.prank(owner);
        company.giveAssessment(1);

        app = company.getApplication(1);
        assertEq(uint256(app.status), uint256(Company.ApplicationStatus.AssessmentGiven));

        // Applicant completes assessment
        vm.prank(applicant);
        company.completeAssessment(1);

        app = company.getApplication(1);
        assertEq(uint256(app.status), uint256(Company.ApplicationStatus.AssessmentCompleted));

        // Company releases results
        vm.prank(owner);
        company.releaseResults(1);

        app = company.getApplication(1);
        assertEq(uint256(app.status), uint256(Company.ApplicationStatus.ResultsOut));

        // Applicant grants data access (increments decryption counter)
        vm.prank(applicant);
        company.grantDataAccess(1);

        app = company.getApplication(1);
        assertEq(uint256(app.status), uint256(Company.ApplicationStatus.DataAccessGranted));

        uint256 femaleDecryptionCount = company.decryptionCounter(Company.Gender.Female);
        assertEq(femaleDecryptionCount, 1);

        // Company sends offer (increments offer counter)
        vm.prank(owner);
        company.sendOffer(1);

        app = company.getApplication(1);
        assertEq(uint256(app.status), uint256(Company.ApplicationStatus.OfferSent));

        uint256 femaleOfferCount = company.offerCounter(Company.Gender.Female);
        assertEq(femaleOfferCount, 1);

        // Applicant accepts offer
        vm.prank(applicant);
        company.acceptOffer(1);

        app = company.getApplication(1);
        assertEq(uint256(app.status), uint256(Company.ApplicationStatus.OfferAccepted));
    }

    function testCountersForDifferentGenders() public {
        vm.prank(owner);
        company.createJobListing("Data Scientist", "Analyze data");

        address maleApplicant = address(0x3);
        address otherApplicant = address(0x4);

        // Male applicant submits application
        vm.prank(maleApplicant);
        company.submitApplication(1, "EncryptedCID_Male", Company.Gender.Male);

        // Other applicant submits application
        vm.prank(otherApplicant);
        company.submitApplication(1, "EncryptedCID_Other", Company.Gender.Other);

        // Proceed with male applicant
        vm.prank(owner);
        company.giveAssessment(2); // Application ID 2

        vm.prank(maleApplicant);
        company.completeAssessment(2);

        vm.prank(owner);
        company.releaseResults(2);

        vm.prank(maleApplicant);
        company.grantDataAccess(2);

        uint256 maleDecryptionCount = company.decryptionCounter(Company.Gender.Male);
        assertEq(maleDecryptionCount, 1);

        vm.prank(owner);
        company.sendOffer(2);

        uint256 maleOfferCount = company.offerCounter(Company.Gender.Male);
        assertEq(maleOfferCount, 1);

        // Proceed with other applicant
        vm.prank(owner);
        company.giveAssessment(3); // Application ID 3

        vm.prank(otherApplicant);
        company.completeAssessment(3);

        vm.prank(owner);
        company.releaseResults(3);

        vm.prank(otherApplicant);
        company.grantDataAccess(3);

        uint256 otherDecryptionCount = company.decryptionCounter(Company.Gender.Other);
        assertEq(otherDecryptionCount, 1);

        vm.prank(owner);
        company.sendOffer(3);

        uint256 otherOfferCount = company.offerCounter(Company.Gender.Other);
        assertEq(otherOfferCount, 1);
    }

    function testOnlyOwnerCanPerformActions() public {
        vm.prank(owner);
        company.createJobListing("QA Engineer", "Test applications");

        vm.prank(applicant);
        company.submitApplication(1, "EncryptedCID", Company.Gender.Unspecified);

        // Non-owner trying to give assessment
        vm.prank(applicant);
        vm.expectRevert("Not authorized");
        company.giveAssessment(1);

        // Non-owner trying to release results
        vm.prank(applicant);
        vm.expectRevert("Not authorized");
        company.releaseResults(1);

        // Owner performs actions
        vm.prank(owner);
        company.giveAssessment(1);

        vm.prank(applicant);
        company.completeAssessment(1);

        vm.prank(owner);
        company.releaseResults(1);

        vm.prank(applicant);
        company.grantDataAccess(1);

        vm.prank(owner);
        company.sendOffer(1);

        // Non-applicant trying to accept offer
        address randomAddress = address(0x5);
        vm.prank(randomAddress);
        vm.expectRevert("Not authorized");
        company.acceptOffer(1);

        // Applicant accepts offer
        vm.prank(applicant);
        company.acceptOffer(1);

        Company.Application memory app = company.getApplication(1);
        assertEq(uint256(app.status), uint256(Company.ApplicationStatus.OfferAccepted));
    }

    function testApplicationStatusFlowConstraints() public {
        vm.prank(owner);
        company.createJobListing("DevOps Engineer", "Manage infrastructure");

        vm.prank(applicant);
        company.submitApplication(1, "EncryptedCID", Company.Gender.Male);

        // Applicant tries to grant data access before results are out
        vm.prank(applicant);
        vm.expectRevert("Results not out");
        company.grantDataAccess(1);

        // Company tries to release results before assessment is completed
        vm.prank(owner);
        vm.expectRevert("Assessment not completed");
        company.releaseResults(1);

        // Applicant completes assessment before it's given
        vm.prank(applicant);
        vm.expectRevert("Assessment not given");
        company.completeAssessment(1);

        // Correct flow
        vm.prank(owner);
        company.giveAssessment(1);

        vm.prank(applicant);
        company.completeAssessment(1);

        vm.prank(owner);
        company.releaseResults(1);

        vm.prank(applicant);
        company.grantDataAccess(1);

        vm.prank(owner);
        company.sendOffer(1);

        vm.prank(applicant);
        company.acceptOffer(1);

        Company.Application memory app = company.getApplication(1);
        assertEq(uint256(app.status), uint256(Company.ApplicationStatus.OfferAccepted));
    }

    function testUpdateJobListing() public {
        vm.prank(owner);
        company.createJobListing("Initial Title", "Initial Description");

        vm.prank(owner);
        company.updateJobListing(1, "Updated Title", "Updated Description", false);

        Company.JobListing memory job = company.getJobListing(1);
        assertEq(job.title, "Updated Title");
        assertEq(job.description, "Updated Description");
        assertFalse(job.isActive);
    }

    function testUnauthorizedUpdateJobListing() public {
        vm.prank(owner);
        company.createJobListing("Job Title", "Job Description");

        vm.prank(applicant);
        vm.expectRevert("Not authorized");
        company.updateJobListing(1, "Malicious Update", "Malicious Description", true);
    }
}
