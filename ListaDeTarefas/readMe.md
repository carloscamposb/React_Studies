
## Hello, Everyone 📃🧑🏻
### This project was built with React Native and Expo, and its purpose is to store activities using AsyncStorage.

> ### The following were imported:
* Hooks: useState, useCallback, useEffect from React.
* General components: View, Text, TouchableOpacity, Image, etc.
* AsyncStorage: For local data storage on the device.
* FontAwesome: To have FontAwesome icons available.
* Animatable: Component animations. / A custom animated button was also created from TouchableOpacity, which normally does not accept Animatable.

> ### UseState:
* task: Task list.
* open: Control of the modal visibility.
* loading: Loading indicator.
* input: Stores the input field text.

> ### Summary of functionality:
* Checking the input field: if the Input is empty, nothing is returned (Screen without activities).
* When pressing the (+) button to create a task, it redirects to a modal and a new task object is created with a value for both the key and the content. In this case, the key will be the same as the content because it is not integrated into a database.
* If the user clicks to send without any content, the activity is not added. Each message written and sent to the task list is added at the end of the list, updating with the new list.
* It was established through setOpen(false) that as soon as the user sends the task that needs to be done, the modal is closed and the initial screen opens again.
* If the user presses (+) again, the modal opens, and the space to fill in the activity will be empty because, with each submission, the input field is cleared to prepare for the next activity.
* The useCallback will memorize the delete task function to avoid recreation on each page render.
* The filter was used to show activities that have a key different from the one the user pressed to delete.
* In the end, there is a state update with the new filtered list.
* The app can be closed, but since it uses AsyncStorage, it retrieves the previously stored list information upon reopening.

### Best regards