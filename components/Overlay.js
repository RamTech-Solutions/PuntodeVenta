import { Canvas, DiffRect, rect, rrect } from "@shopify/react-native-skia";
import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const innerDimension = 300;

const outer = rrect(rect(0, 0, width, height), 0, 0);
const inner = rrect(
  rect(
    width / 2 - innerDimension / 2,
    height / 2 - innerDimension / 2,
    innerDimension,
    innerDimension
  ),
  50,
  50
);

export default function Overlay() {
  return (
    <Canvas
      style={Platform.OS === "android" ? { flex: 1 } : { position: "absolute" }}
    >
      <DiffRect inner={inner} outer={outer} color="black" opacity={0.5} />
    </Canvas>
  );
}
