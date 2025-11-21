# Standup - Week 6

## What I Completed
- [x] Built the admin dashboard filters (campus, category, status, keyword search)
- [x] Added status management tools (dropdown to set Open/In Progress/Resolved + cancel action)
- [x] Implemented CSV export for any filtered dataset to unblock reporting workflows

## What I'm Working On
- [ ] Hooking status changes into the Express API + JSON store so updates persist
- [ ] Writing smoke tests around filtering logic before we merge to main
- [ ] Coordinating with Jason on admin UI copy and empty states

## Blockers
- Need clarity on the long-term status taxonomy (do we keep “Cancelled” once requests are resolved?); holding off on server schema changes until the team aligns.

## Learning Goals This Week
- Explore better patterns for generating CSVs and handling large data sets in the browser without locking up the UI.

## Notes
- Filters + CSV export significantly improved demo storytelling—Leo can now slice data live and show stakeholders exactly what they ask for.

## [OPTIONAL] AI Usage Reflection
- Used AI to compare different CSV generation patterns; selected the approach that balanced readability with compatibility.

