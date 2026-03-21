export type Role = 'Learner' | 'Employer' | 'Institution' | 'Incubator' | 'SETA';
export type AccountStatus = 'active' | 'pending' | 'suspended';
export type OrgType = 'employer' | 'institution' | 'incubator' | 'seta';

export interface User {
  id: number;
  email: string;
  role: Role;
  first_name: string | null;
  phone: string | null;
  account_status: AccountStatus;
  created_at: string;
}

export type Race = 'black_african' | 'coloured' | 'indian' | 'asian' | 'white' | 'other' | 'prefer_not_to_say';
export type Gender = 'male' | 'female' | 'non_binary' | 'prefer_not_to_say';
export type Disability = 'yes' | 'no' | 'prefer_not_to_say';
export type Nationality = 'south_african' | 'permanent_resident' | 'refugee_permit' | 'other';

export interface LearnerProfile {
  id: number;
  user: number;
  institution: number | null;
  district: string;
  nqf_level: string;
  qualification: string;
  skills: string[];
  status: 'searching' | 'placed' | 'training';
  race: Race | null;
  gender: Gender | null;
  disability: Disability | null;
  nationality: Nationality | null;
  date_of_birth: string | null;
  id_number: string | null;
  updated_at: string;
}

export interface OrganisationProfile {
  id: number;
  user: User;
  org_type: OrgType;
  company_name: string;
  registration_number: string;
  contact_person: string;
  use_case: string;
  district: string;
  institution_type: string | null;
  payment_status: 'unpaid' | 'paid';
  verified_at: string | null;
  created_at: string;
}

export interface Opportunity {
  id: number;
  employer: number;
  title: string;
  type: 'learnership' | 'internship' | 'job';
  district: string;
  nqf_required: number;
  skills_required: string[];
  stipend: number | null;
  spots_available: number;
  status: 'open' | 'closed' | 'filled';
  closes_at: string | null;
  created_at: string;
}

export interface Application {
  id: number;
  learner: number;
  opportunity: number;
  status: 'pending' | 'reviewed' | 'accepted' | 'declined';
  channel: 'app' | 'ussd';
  applied_at: string;
}

export interface Match {
  id: number;
  learner: number;
  opportunity: number;
  fit_score: number;
  ai_reason: string;
  matched_at: string;
}

export interface GapAlert {
  id: number;
  district: string;
  alert_type: 'critical_gap' | 'high_gap' | 'ready_to_scale';
  learners_ready: number;
  learners_placed: number;
  detail: string;
  status: 'open' | 'actioned' | 'resolved';
  created_at: string;
}

// ── Auth payloads ─────────────────────────────────────────────────────────────

export interface LearnerRegisterData {
  email: string;
  password: string;
  first_name: string;
  phone: string;
  district: string;
  nqf_level: string;
  qualification: string;
  skills: string[];
  institution_id?: number | null;
  race?: Race | null;
  gender?: Gender | null;
  disability?: Disability | null;
  nationality?: Nationality | null;
  date_of_birth?: string | null;
  id_number?: string | null;
}

export interface OrgRegisterData {
  email: string;
  password: string;
  first_name: string;
  phone: string;
  org_type: OrgType;
  company_name: string;
  registration_number?: string;
  contact_person?: string;
  use_case?: string;
  district?: string;
  institution_type?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  warning?: string;
}

export interface OrgRegisterResponse {
  message: string;
  user: User;
}
