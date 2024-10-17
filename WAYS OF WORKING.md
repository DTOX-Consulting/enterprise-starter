# Development Ways of Working

## Git Workflow: GitHub Flow

We follow the GitHub Flow model for our development process. This workflow is designed to be lightweight and branch-based, allowing for frequent and small merges.

### Key Principles:

1. **Branch from main**: Create a new branch for each piece of work.
2. **Descriptive branch names**: Use clear, descriptive names for your branches (e.g., `feature/add-login-form`, `bugfix/fix-memory-leak`).
3. **Commit early and often**: Make small, focused commits with clear messages.
4. **Open a Pull Request (PR) early**: This allows for early feedback and discussion.
5. **Request reviews**: Ask for code reviews from teammates.
6. **Merge after approval**: Once the PR is approved and CI passes, merge it into the main branch.

## Small, Frequent Merges

We encourage small, frequent merges to maintain a smooth development process and reduce integration conflicts.

### Benefits:

- Easier code reviews
- Faster feedback cycles
- Reduced merge conflicts
- Quicker bug detection
- Continuous delivery of value

### Guidelines:

- Aim for PRs that can be reviewed in 15-30 minutes
- Keep changes focused on a single feature or bug fix
- If a task is large, break it down into smaller, independent pieces

## Discrete Work Units

Each piece of work should be a discrete, self-contained unit that can be added to the project independently.

### Characteristics of a good work unit:

- Focused on a single feature, enhancement, or bug fix
- Can be tested independently
- Does not break existing functionality
- Adds value to the project on its own

### Tips:

- Use feature flags for larger changes that need to be merged incrementally
- Ensure each PR includes necessary tests and documentation updates

## Push Often

Pushing your work frequently to the remote repository is crucial for collaboration and work division.

### Benefits:

- Allows for early feedback and course correction
- Reduces the risk of losing work
- Enables easier tracking of progress

### Best practices:

- You should have at least one PR a day
- Push at least once a day, preferably more often
- Push before stepping away from your work for an extended period
- Use descriptive commit messages to make it easy for others to understand your changes

## Code Review Process

1. **Author**: Open a PR with a clear description of changes and any necessary context
2. **Reviewers**: Aim to review PRs within 24 hours
3. **Discussion**: Use PR comments for questions, suggestions, and discussions
4. **Iterations**: Make requested changes and push updates to the PR
5. **Approval**: Obtain required approvals before merging
6. **Merge**: The author merges the PR once it's approved and CI passes

## Linting, Testing, and Code Quality

Maintaining high code quality is crucial for the long-term health of our project. We enforce this through linting, type checking, and comprehensive testing.

### Linting and Type Checking

- We use linters and type checkers to ensure code consistency and catch potential errors early.
- Run linters and type checkers locally before pushing your changes.
- CI will run these checks on every PR.

### Testing

- Write tests for each new feature or bug fix where applicable.
- Aim for high test coverage, but prioritize meaningful tests over coverage percentage.
- Run the test suite locally before marking a task as complete.

### Pre-commit Hooks

- We use pre-commit hooks to run linters, type checkers, and tests before each commit.
- If needed, you can use `git commit --no-verify` to bypass these checks for work-in-progress commits.
- However, ensure all checks pass locally before marking a task as complete or opening a PR.

### Best Practices

1. **Write tests alongside code**: As you develop a feature, write corresponding tests.
2. **Run checks locally**: Always run linters, type checks, and tests locally before pushing.
3. **Fix issues promptly**: Address any linting or type checking issues as they arise.
4. **Use `--no-verify` judiciously**: Only use this flag for temporary, work-in-progress commits.
5. **CI is the final check**: Even if you've used `--no-verify`, ensure all checks pass in CI before merging.

Remember, while tools like `--no-verify` can be useful for intermediate commits, they should not be used to bypass our quality standards. Always ensure your final PR passes all checks both locally and in CI before considering it ready for review.

These practices help maintain code quality, catch bugs early, and make the review process smoother for everyone involved.
