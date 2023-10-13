# wl-explorer-e2e

## First steps to install and run

### Short version (AKA "I know what I am doing")
Requires nodeJS (tested also on 18+).

The following commands will set latest yarn version locally in the project:
```shell
corepack enable
```
```shell
yarn set version stable
```
These commands will install project dependencies: 
```shell
yarn
``` 
```shell
yarn playwright install
``` 
Running tests in ui mode:
```shell
yarn dev --ui
``` 

### Long version (AKA "I am here for the first time")
#### `NodeJS` Install 
First thing to do would be to install `nodeJS`. There's [installation guide](https://nodejs.org/en/download) for it on their site. Be sure to select **latest version** (**20.*** or even newer) **not** the LTS one. 

Notice, that if you are using Windows, there is an .msi installer available, that should do everything for you.

If you already have (or plan to have) other `nodeJS` projects on your machine it would be a good idea to also  [install nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to better handle different `nodeJS` versions for each of the projects. Though `nvm` requires bash to work and so is only practical on Linux/Unix/macOS. There is `nvm` analog for Windows, but this guide here doesn't cover that topic so far.

 #### `Git` install
In order to have the latest version of the files at hand and to commit your proposed changes back to the main repository, you will need to [install git](https://git-scm.com/downloads) - version control system.

If using Windows installer for `git`, you can select the recommended options, they are just fine for the first start.

#### _JetBrains Aqua_ Install
This is optional, and you do not have to have _Aqua_ to run and/or contribute to the project. Though _Aqua_ looks to be well suited for the tasks and at the moment is in so-called "Early Access Preview" phase and hence free for use. You can download the installer for your OS from the official [download page](https://www.jetbrains.com/aqua/download). There's a selection if you want to install just _Aqua_, or the _JetBrains ToolBox_ package. The latter is convenient to install and update all the _JetBrains_ products and also to quickly access all of your recent projects in their respective IDEs. So _ToolBox_ is recommended, but is again optional.

Once opened _Aqua_ will require a _JetBrains_ account login to register in the EAP program. If you do not have a _JetBrains_ account, you can quickly create one - they support _Google_ and _GitHub_ accounts.

#### Getting your local copy of the project
##### Through GUI (_Aqua_)
If you've installed _Aqua_, on the fist run it will offer you to open a project from version control. Later on this action is accessible from the "main menu"->File->New->"Project from Version Control". There it will offer you to log into your _GitHub_ account and allow to choose from your accessible repositories one that you'd like to open. In our case it will be "wl-explorer-e2e". 

You could also clone the project using the CLI method described below and then open the folder of the project in _Aqua_ ("main menu"->File->"Open..." then just select the project folder and hit OK - _Aqua_ will treat the folder as a project).

##### Through command line interface
With command line interface of your choice (_Terminal_, _CMD_, _Windows PowerShell_, _gitbash_ etc.) get to you work projects directory. There type in `git clone <repository_url_in_desired_format>` (git:// or ssh:// is recommended, though it may require some setup - e.g. adding you ssh keys to your _GitHub_ account, https:// is good enough for the first time - that can be altered later) to get the latest version of the main branch of the project.

When using _Windows_, if you used the official git installer with default options, in your _Windows Explorer_ you can get to you work projects folder and click right mouse button to get the context menu, which should now have option "Open git bash here". After that just `git clone` the repository as described above.

### Running for the first time
Once you've got the `nodeJS` installed and your project files checked out, get to your project directory with your command line interface of choice. If you've installed _Aqua_, and opened the project folder there, in the left-bottom part of the _Aqua_ window you'll find the terminal button - `>_`. Hitting it will open the terminal in the root folder of the project.

It is required that you install `yarn` as well. To do so, in your terminal type in `corepack enable` and `yarn set version stable`. This enables automatic installation of `yarn` on its first run.

Now type in `yarn`. You will see some progress indicators, and it would finally say something like `YN0000: Done with warnings in 0s 123ms`. Meaning - it downloaded the dependencies, compiled the scrips, checked same basics, and you are ready to run your tests.

One last important step:
#### Installing _Playwright_ and web drivers
In order to run tests inside the browser, make screenshots etc. _Playwright_ has to install some dependencies. Thankfully it does everything automatically. You just need to run `yarn playwright install` and it will download and install everything it needs. 

### Running the tests
To run the tests run `yarn playwright test --ui` that will open the UI window with a list of tests and ability to run them right away.

It is also possible to run the tests in your JetBrains Aqua IDE, by adding configuration with the appropriate button on the top right: "Add Configuration..."->"Edit configurations..."->"Add new configuration"->"Playwright"->OK. Be sure to set proper node version in your testing configuration (in case you have several on your computer). Note, that Aqua runs the tests without showing the browser window - just displaying the progress and list of the tests succeeded or failed. But the bonus here is an ability to jump quickly to the code of each test.

### Turning on _eslint_ and _prettier_ in JetBrains Aqua
For `eslint` you need to open **Settings (or Preferences) -> Languages & Frameworks -> JavaScript -> Code Quality Tools -> ESLint**. Here you should select `Automatic ESLint configuration` and check `Run eslint --fix on save`.

For `prettier` you need to open **Settings (or Preferences) -> Languages & Frameworks -> JavaScript -> Prettier**. Here you should select `Automatic Prettier configuration` and check `Run on save`.

## Running with different configuration options
### Chosing the right servers
We've added a few aliases, which allow you to run the tests on the environment of your choice. E.g.:
```shell
yarn dev 
```
would run the tests using http://wl-explorer-fe-dev.wellnessliving.com as the frontend server (it sets the backend server URL as well, though so far the backend server URL is not used in any tests). If you would like to run (and compare?) the tests on the production server you can run
```shell
yarn prod
```
and it will do the same tests on http://wl-explorer-fe-prod.wellnessliving.com now, without you changing anything in the tests themselves.
Files controlling the URLs are stored in the `config` folder of the project.

There's one for `dev`, `stage`, `prod`, `local` (for tests on you local machine) and also `custom` to do something mixed or unpredictable.

To open the **last generated report** with tests running result use a shortcut command below:
```shell
yarn report
```

### Starting Playwright in different modes
Previous commands will run **_all tests for all specified projects (devices)_** in the silence mode - you will not see _Playwright's_ UI window, you will not see the browser, everything will be just printed out to console.
You can run any command from `scripts` section of the `package.json` file with `--ui` flag to see _Playwright's_ UI:
```shell
yarn dev --ui
```
To see the actual browser window and actions made by Playwright in it, add `--headed`:
```shell
yarn dev --headed
```
For a debugging purpose just add `--debug` flag:
```shell
yarn dev --debug
```
### Adding extra running options
As it was already mentioned above, Playwright will run all tests (under the `tests` folder) for all projects (devices) by default. But fortunately, this can be changed according to your needs.

Command bellow will run specified set of tests only. You can provide names of the folder(s) or file(s) you want to test separated by a whitespace:
```shell
yarn dev home-page smoke1
```
In case if you would like to run your tests in a specific project (device) only you can add a flag like `--project=webkit`. Name of the project should be taken from a `playwright.config.ts` file. You can provide several projects separated by a whitespace:
```shell
yarn dev --project=firefox --project=android
```
### Wrapping up
With a created scripts you can easily run test for environment of your choice. But in some particular cases you would like to modify the default running behavior. 

Here is a command structure you should use:
```
yarn <dev|stage|prod|local|custom> [name-of-a-test-folder-or-a-file] [--project=<name>] [--ui|--headed|--debug]
```

Here is a [reference](https://playwright.dev/docs/test-cli) with a description of all possible parameters to modify tests running. 