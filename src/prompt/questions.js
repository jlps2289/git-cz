const MAX_SUBJECT_LENGTH = 64;
const MIN_SUBJECT_LENGTH = 3;
const MIN_SUBJECT_LENGTH_ERROR_MESSAGE = `The subject must have at least ${MIN_SUBJECT_LENGTH} characters`;

const questions = [
  {
    choices: [
      {
        name: 'feat:     A new feature',
        value: 'feat'
      },
      {
        name: 'fix:      A bug fix',
        value: 'fix'
      },
      {
        name: 'docs:     Documentation only changes',
        value: 'docs'
      },
      {
        name: 'style:    Markup-only changes (white-space, formatting, missing semi-colons, etc)',
        value: 'style'
      },
      {
        name: 'refactor: A code change that neither fixes a bug or adds a feature',
        value: 'refactor'
      },
      {
        name: 'perf:     A code change that improves performance',
        value: 'perf'
      },
      {
        name: 'test:     Adding missing tests',
        value: 'test'
      },
      {
        name: 'chore:    Build process or auxiliary tool changes',
        value: 'chore'
      },
      {
        name: 'ci:       CI related changes',
        value: 'ci'
      }
    ],
    message: 'Select the type of change that you\'re committing:',
    name: 'type',
    type: 'list'
  },
  {
    filter: (input) => {
      let subject;

      subject = input.trim();
      while (subject.endsWith('.')) {
        subject = subject.substr(0, subject.length - 1).trim();
      }

      return subject;
    },
    leadingLabel: (answers) => `${answers.type}:`,
    maxLength: MAX_SUBJECT_LENGTH,
    message: 'Write a short, imperative mood description of the change:',
    name: 'subject',
    type: 'limitedInput',
    validate: (input) => input.length >= MIN_SUBJECT_LENGTH || MIN_SUBJECT_LENGTH_ERROR_MESSAGE
  },
  {
    message: 'Provide a longer description of the change:\n',
    name: 'body',
    type: 'input'
  },
  {
    message: 'List any breaking changes:\n BREAKING CHANGE:',
    name: 'breaking',
    type: 'input'
  },
  {
    message: 'Reference any task that this commit closes:\n Issues:',
    name: 'footer',
    type: 'input'
  }
];

const makePackagesQuestion = (allPackages, changedPackages) => ({
  choices: allPackages,
  default: changedPackages,
  message: `The packages that this commit has affected (${changedPackages.length} detected)\n`,
  name: 'packages',
  type: 'checkbox'
});

module.exports = {
  makePackagesQuestion,
  questions
};
