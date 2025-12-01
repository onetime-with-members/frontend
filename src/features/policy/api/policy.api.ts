import { PolicySchema } from '../schemas';
import apiClient from '@/lib/api';

export async function editUserPolicyAction(policy: PolicySchema) {
  const res = await apiClient.put('/users/policy', {
    service_policy_agreement: policy.servicePolicy,
    privacy_policy_agreement: policy.privacyPolicy,
    marketing_policy_agreement: policy.marketingPolicy,
  });
  return res.data.payload;
}
