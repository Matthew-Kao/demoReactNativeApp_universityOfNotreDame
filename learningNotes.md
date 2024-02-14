React Native Notes

Hot Reloading
allows you to see the changes in real-time (Similar to Flutter)

<View>
used to create a container for other components (Similar to <div> in HTML)
often used to create layout structures for other components and uses flexbox layout by default

<TouchableOpacity>
interactive element that fades in opacity when pressed

<ActivityIndicator>
used for showing a spineer or loading indicator

<Flatlist>
used for rendering long list of items that need to be scrolled efficiently

For larger lists with smooth scrolling go with FlatList
For smaller lists use Map Function

<ScrollView>
a box that can hold multiple components and views, and providing a scrolling container for them

<SafeAreaView>
provides a safe zone to render App's content without being covered by the device's hardward features like Apple's Notch

<useState>
Flutter: similar to mananging the state of a variable in a stateful widget in the sense that it triggers component to be re-rendered when its state changes

<useEffect>
Lets you perform side effects in functional components. Used for operations like data fetching, subscriptions, or manually changing the DOM.
Questions

1. I am hard-coding the values for width and height values. In flutter, you use Mediabox.height to ensure that for every device, the UI would
   look the same. Should I do the same here? is it bad practice to hard-code these values?

2. Should styles be separated in a different file? I read conflicting opinions, however, I know that in flutter they are separated, but I will stick to not separating because most of the youtube videos I watched told me not to.

3. My Code errors when trying to do separate screens into files. Have to look deeper into why that is.

Good Practices

1. SafeAreaView (similar to SafeArea in Flutter): use this to ensure content is not overlapped by physical features of devices, such as Apple's Notch

2. Standard practice of keeping styles in Alphabetical Order

3. Try to keep validation functions outside of components
