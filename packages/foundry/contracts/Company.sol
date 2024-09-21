// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Company {
    address public owner;
    string public companyPublicKey;
    string public name;

    struct JobListing {
        uint256 id;
        string title;
        string description;
        bool isActive;
    }

    struct Application {
        address applicant;
        uint256 jobId;
        string encryptedDataCID; // IPFS CID of encrypted data
        ApplicationStatus status;
        Gender gender;
    }

    enum ApplicationStatus {
        Applied,
        AssessmentGiven,
        AssessmentCompleted,
        ResultsOut,
        DataAccessGranted,
        OfferSent,
        OfferAccepted
    }
    enum Gender {
        Unspecified,
        Male,
        Female,
        Other
    }

    uint256 public jobCounter;
    uint256 public applicationCounter;

    mapping(uint256 => JobListing) public jobListings;
    mapping(uint256 => Application) public applications;

    // Counters for gender statistics
    mapping(Gender => uint256) public decryptionCounter;
    mapping(Gender => uint256) public offerCounter;

    event JobListingCreated(uint256 indexed jobId, string title);
    event ApplicationSubmitted(
        uint256 indexed applicationId,
        address indexed applicant,
        uint256 indexed jobId
    );
    event AssessmentGiven(uint256 indexed applicationId);
    event AssessmentCompleted(uint256 indexed applicationId);
    event ResultsOut(uint256 indexed applicationId);
    event DataAccessGranted(uint256 indexed applicationId);
    event OfferSent(uint256 indexed applicationId);
    event OfferAccepted(uint256 indexed applicationId);

    constructor(
        address _owner,
        string memory _companyPublicKey,
        string memory _name
    ) {
        owner = _owner;
        companyPublicKey = _companyPublicKey;
        name = _name;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    // Job Listing Functions

    function createJobListing(
        string memory _title,
        string memory _description
    ) public onlyOwner {
        jobCounter++;
        jobListings[jobCounter] = JobListing(
            jobCounter,
            _title,
            _description,
            true
        );
        emit JobListingCreated(jobCounter, _title);
    }

    function updateJobListing(
        uint256 _jobId,
        string memory _title,
        string memory _description,
        bool _isActive
    ) public onlyOwner {
        require(jobListings[_jobId].id != 0, "Job listing does not exist");
        JobListing storage job = jobListings[_jobId];
        job.title = _title;
        job.description = _description;
        job.isActive = _isActive;
    }

    // Application Functions

    function submitApplication(
        uint256 _jobId,
        string memory _encryptedDataCID,
        
    ) public {
        require(jobListings[_jobId].isActive, "Job listing is not active");
        applicationCounter++;
        applications[applicationCounter] = Application(
            msg.sender,
            _jobId,
            _encryptedDataCID,
            ApplicationStatus.Applied,
            _gender
        );
        emit ApplicationSubmitted(applicationCounter, msg.sender, _jobId);
    }

    function giveAssessment(uint256 _applicationId) public onlyOwner {
        Application storage app = applications[_applicationId];
        require(
            app.status == ApplicationStatus.Applied,
            "Invalid application status"
        );
        app.status = ApplicationStatus.AssessmentGiven;
        emit AssessmentGiven(_applicationId);
    }

    function completeAssessment(uint256 _applicationId) public {
        Application storage app = applications[_applicationId];
        require(app.applicant == msg.sender, "Not authorized");
        require(
            app.status == ApplicationStatus.AssessmentGiven,
            "Assessment not given"
        );
        app.status = ApplicationStatus.AssessmentCompleted;
        emit AssessmentCompleted(_applicationId);
    }

    function releaseResults(uint256 _applicationId) public onlyOwner {
        Application storage app = applications[_applicationId];
        require(
            app.status == ApplicationStatus.AssessmentCompleted,
            "Assessment not completed"
        );
        app.status = ApplicationStatus.ResultsOut;
        emit ResultsOut(_applicationId);
    }

    function grantDataAccess(uint256 _applicationId) public {
        Application storage app = applications[_applicationId];
        require(app.applicant == msg.sender, "Not authorized");
        require(app.status == ApplicationStatus.ResultsOut, "Results not out");
        app.status = ApplicationStatus.DataAccessGranted;

        // Increment decryption counter based on gender
        decryptionCounter[app.gender] += 1;

        emit DataAccessGranted(_applicationId);
    }

    function sendOffer(uint256 _applicationId) public onlyOwner {
        Application storage app = applications[_applicationId];
        require(
            app.status == ApplicationStatus.DataAccessGranted,
            "Data access not granted"
        );
        app.status = ApplicationStatus.OfferSent;

        // Increment offer counter based on gender
        offerCounter[app.gender] += 1;

        emit OfferSent(_applicationId);
    }

    function acceptOffer(uint256 _applicationId) public {
        Application storage app = applications[_applicationId];
        require(app.applicant == msg.sender, "Not authorized");
        require(app.status == ApplicationStatus.OfferSent, "Offer not sent");
        app.status = ApplicationStatus.OfferAccepted;
        emit OfferAccepted(_applicationId);
    }

    // Retrieve application details
    function getApplication(
        uint256 _applicationId
    ) public view returns (Application memory) {
        return applications[_applicationId];
    }

    // Retrieve job listing details
    function getJobListing(
        uint256 _jobId
    ) public view returns (JobListing memory) {
        return jobListings[_jobId];
    }
}
