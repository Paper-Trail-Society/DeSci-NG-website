export type ProjectShowcaseSubmissionPayload = {
  fullName: string;
  email: string;
  phoneNumber: string;
  institutionId: number;
  department: string;
  degreeProgram: string;
  projectTitle: string;
  projectSummary: string;
  problemStatement: string;
  currentProgress: string;
  expectedImpact: string;
  expectedStartDate: string;
  expectedEndDate: string;
  willProvideUpdates: boolean;
  consentToFeature: boolean;
  inspiration?: string;
  supportUse?: string;
  beneficiaries?: string;
  projectUrl?: string;
  repositoryUrl?: string;
  demoUrl?: string;
};

export type ProjectShowcaseSubmission = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  department: string;
  degreeProgram: string;
  projectTitle: string;
  projectSummary: string;
  problemStatement: string;
  currentProgress: string;
  expectedImpact: string;
  expectedStartDate: string;
  expectedEndDate: string;
  willProvideUpdates: boolean;
  consentToFeature: boolean;
  inspiration?: string | null;
  supportUse?: string | null;
  beneficiaries?: string | null;
  projectUrl?: string | null;
  repositoryUrl?: string | null;
  demoUrl?: string | null;
  status: "pending";
  createdAt: string;
  updatedAt: string;
  institution: {
    id: number;
    name: string;
  };
};

export type CreateProjectShowcaseSubmissionResponse = {
  status: "success";
  message: string;
  submission: ProjectShowcaseSubmission;
};

export type ProjectShowcaseWaitlistPayload = {
  email: string;
};

export type ProjectShowcaseWaitlistEntry = {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateProjectShowcaseWaitlistResponse = {
  status: "success";
  message: string;
  entry: ProjectShowcaseWaitlistEntry;
};
