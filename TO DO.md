# Behaviour questions
 - should ``gulp --new`` automatically checkout to main before creating a new branch? Users *might* want to branch off an existing thrashered for their new one, but typical use case is new thrashers **new** branch.
 - What is the purpose behind the name splitting logic in gulpfile ``newThrasher`` function? I.E. should users ever include a ``name`` argument that includes a slash and if so, what is the desired output? If no, would be better for the script to throw if they do instead of attempting to parse the input and not necessarily doing what the user expects?

# Documentation questions
 - update `gulp --new` section after purpose of name splitting logic confirmed
 - clarify central production's role in relation to the container names and why thye might do this, and the impact on using it in code - ie you need to make sure they use the same container name as you for code referencing the section it to work.
 - clarify - when updating a thrasher is it recommended to change the year and month in the config.path so deploying will save a new version in s3 and not overwrite the old one?
- for the "Post Deploying / Using your Thrasher" section - is fronts the *only* tool to deploy thrashers/atoms with or are there others? 
- link to documentation for fronts showing how to deploy to fronts using the capi url (drag and drop url onto the clipboard?)
- outline the typical test/approval/deploy workflow (critically, who can give a developer 'sign-off' to change something) - preferably pointing to an external document as that isn't really a technical matter beloning here