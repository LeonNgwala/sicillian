from .models import LearnerProfile, Opportunity, Match

def calculate_match_score(learner: LearnerProfile, opportunity: Opportunity):
    """
    Calculates a match score (0-100) between a learner and an opportunity.
    Returns (score, reason)
    """
    score = 0
    reasons = []

    # 1. Skills Matching (Weighted 60%)
    learner_skills = set(s.lower() for s in learner.skills)
    required_skills = set(s.lower() for s in opportunity.skills_required)
    
    if required_skills:
        matching_skills = learner_skills.intersection(required_skills)
        skill_percentage = len(matching_skills) / len(required_skills)
        score += int(skill_percentage * 60)
        
        if matching_skills:
            reasons.append(f"Matches {len(matching_skills)} required skills: {', '.join(matching_skills)}.")
        else:
            reasons.append("No direct skill matches found.")
    else:
        score += 60 # No skills required, default high score
        reasons.append("Opportunity has no specific skill requirements.")

    # 2. Location Matching (Weighted 20%)
    if learner.district.lower() == opportunity.district.lower():
        score += 20
        reasons.append(f"Located in the same district ({opportunity.district}).")
    else:
        reasons.append(f"Located in {learner.district} (Opportunity is in {opportunity.district}).")

    # 3. Education/NQF Level (Weighted 20%)
    try:
        learner_nqf = int(learner.nqf_level)
        if learner_nqf >= opportunity.nqf_required:
            score += 20
            reasons.append(f"NQF Level {learner_nqf} meets or exceeds requirements.")
        else:
            reasons.append(f"NQF Level {learner_nqf} is below the required Level {opportunity.nqf_required}.")
    except (ValueError, TypeError):
        reasons.append("NQF level validation pending.")

    full_reason = " | ".join(reasons)
    return score, full_reason

def run_matching_engine_for_learner(learner_id):
    """
    Finds and saves the top matches for a specific learner.
    """
    learner = LearnerProfile.objects.get(id=learner_id)
    opportunities = Opportunity.objects.filter(status='open')
    
    # Clear old matches to keep data fresh
    Match.objects.filter(learner=learner).delete()
    
    matches_created = []
    for opp in opportunities:
        score, reason = calculate_match_score(learner, opp)
        
        # Only save matches with a decent score (e.g., > 30%)
        if score > 30:
            match = Match.objects.create(
                learner=learner,
                opportunity=opp,
                fit_score=score,
                ai_reason=reason
            )
            matches_created.append(match)
            
    return matches_created
