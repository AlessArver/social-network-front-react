import wrtc from "wrtc";
import Peer from "simple-peer";

export const peer = new Peer({ initiator: true, wrtc: wrtc });
