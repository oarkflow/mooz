import {Socket} from 'socket.io-client'
import Peer from '../comps/simple-peer'
import {RefObject} from 'react'

// TODO Enum keys to reduce socket payload.
export type ISocketMessageData =
    | {
    connection: true
    userName: string
}
    | {
    sdpSignal: unknown
    metaData: ConnectionMetaData
}

type ConnectionMetaData = {
    screenStreamId: string
    userStreamId: string
}

export interface IChatState {
    messages: IChatMessage[]
}

export interface IPeerData {
    chat?: IChatMessage
}

export class Stream extends MediaStream {
    get empty(): boolean {
        return this.getTracks().length === 0
    }

    get noVideo(): boolean {
        return this.getVideoTracks().length === 0
    }

    get noAudio(): boolean {
        return this.getAudioTracks().length === 0
    }

    addTrack = (track: MediaStreamTrack): void => {
        super.addTrack(track)

        const ev = new MediaStreamTrackEvent('addtrack', {track})
        this.dispatchEvent(ev)
    }

    removeTrack = (track: MediaStreamTrack): void => {
        track.stop()
        super.removeTrack(track)

        const ev = new MediaStreamTrackEvent('removetrack', {track})
        this.dispatchEvent(ev)
    }

    destroy = (): void => {
        this.getTracks().forEach(this.removeTrack)
    }
}

export interface ILocalState {
    sessionId: string
    userStream: Stream
    displayStream: Stream
    videoDevices: MediaDeviceInfo[]
    audioDevices: MediaDeviceInfo[]
    currentCameraId: string | null
    currentMicId: string | null
    screenMediaActive: boolean
    inviteCoachmarkVisible: boolean
    showEmptyMediaPanel: boolean
    sidePanelTab: 'chats' | 'people' | undefined
    floatingChatEnabled: boolean
    fullscreenEnabled: boolean
    screenShareButtonRef?: RefObject<HTMLButtonElement>
    cameraButtonRef?: RefObject<HTMLButtonElement>
    micButtonRef?: RefObject<HTMLButtonElement>
    chatsButtonRef?: RefObject<HTMLButtonElement>
    preferences: {
        userName?: string
        meetingName?: string
    }
}

export interface IRemoteState {
    socket: Socket<IServerToClientEvent<ISocketMessageData>,
        IClientToServerEvent<ISocketMessageData>>
    room: IRoom | null
    connections: IConnection[]
}

export interface IChatMessage {
    id: string
    text: string
    userLabel: string
    mine?: boolean
}

export interface IConnection {
    userId: string
    initiator: boolean
    userName: string
    userStream: Stream
    displayStream: Stream
    peerInstance: Peer.Instance
    metaData?: ConnectionMetaData
}

export interface IRoom {
    id: string
    created_by?: string
    name: string
    opts?: {
        capacity?: number
    }
}

export type IServerRoom = {
    userIds: string[]
} & IRoom

export interface ISocketData {
    sessionId: string
}

type Ev<T extends object = object> = (
    opts: T,
    cb?: (arg0?: Error) => void,
) => void

export interface IServerToClientEvent<T = unknown> {
    'action:room_connection_established': Ev<{ room: IRoom }>
    'action:room_connection_terminated': Ev<{ roomId: string }>

    'action:establish_peer_connection': Ev<{ userName: string; userId: string }>
    'action:terminate_peer_connection': Ev<{ userId: string }>

    'action:message_received': Ev<{ from: string; data: T }>
}

export interface IClientToServerEvent<T = unknown> {
    'request:create_room': Ev<{ room: IRoom }>
    'request:join_room': Ev<{ userName: string; roomId: string }>
    'request:leave_room': Ev<{ roomId: string }>

    'request:send_mesage': Ev<{ to: string; roomId: string, data: T }>
    'request:report_person_left': Ev<{ userId: string; roomId: string }>
}