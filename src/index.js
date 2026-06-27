import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";
import { loadFont } from '@remotion/google-fonts/Kalam';

// ২. ফন্টটি লোড করা হলো (এখানে ওজনের/weights ভ্যারিয়েশনও দিতে পারেন)
loadFont();

registerRoot(RemotionRoot);
