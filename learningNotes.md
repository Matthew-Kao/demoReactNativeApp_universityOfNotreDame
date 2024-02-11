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

Questions

1. you are hard-coding the values for width and height values. In flutter, you use Mediabox.height to ensure that for every device, the UI would
   look the same. Should you do the same here? is it bad practice to hard-code these values?
