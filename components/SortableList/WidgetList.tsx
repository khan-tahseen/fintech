import React from "react";
import { MARGIN } from "./Config";
import Tile from "./Tile";
import SortableList from "./SortableList";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const tiles = [
    {
        id: 'spent',
    },
    {
        id: 'cashback',
    },
    {
        id: 'recent',
    },
    {
        id: 'cards',
    }
];

const WidgetList = () => {
    return (
        <GestureHandlerRootView>
        <View
            style={{ paddingHorizontal: MARGIN }}
        >
            <SortableList
                editing={true}
                onDragEnd={(positions) =>
                    console.log(JSON.stringify(positions, null, 2))
                }
            >
                {tiles.map((tile, index) => (
                    <Tile
                        onLongPress={() => true}
                        key={tile.id + "-" + index}
                        id={tile.id}
                    />
                ))}
            </SortableList>
        </View>
        </GestureHandlerRootView>
    );
};

export default WidgetList;