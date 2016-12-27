
<img src="./screen.gif"/>

*** Required Props ***
- menu: The menu component

*** Optional Props (See ./example for usage) ***
- maxHeight: How far can the view expand
- minHeight: How much to show in the closed state
- value: true or false
- style: Style of child view
- containerStyle: Style of container
- animatedValue: Optional ```Animated.Value(minHeight)``` used to link animations inline with menu. See example in repo.


***Minimal Example***

```
import Expand = from 'react-native-simple-expand';
```


```
    render() {

        return (
           <View>
                            <TouchableOpacity onPress={() => this.setState({ open: !this.state.open })}>
                                <Text>Toggle Menu</Text>
                            </TouchableOpacity>
                            <Expand value={this.state.open}>
                                <Text>
                                    Some very very very very very very very very very very very very very very very very very
                                    very very very long text
                                </Text>
                            </Expand>
                        </View>
        );
    }
    };
```
