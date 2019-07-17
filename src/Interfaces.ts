export interface IUser {
    id: string,
    name: string,
    avatar_url: string,
    title: string
}

export interface IInfluencer {
    id: string,
    name: string,
    avatar_url: string,
    title: string
}

export interface IEvent {
    id: string,
    date: string,
    user: IUser,
    charity: ICharity
}

export interface IFanMail {
    id: string
    to: IInfluencer
    from: IUser
    title: String
    description: String
    video_url: String
    video_thumbnail_url: String
    video_private: Boolean
    influencer_watched: Boolean
}

export interface ICharity {
    id: string,
    title: string,
    avatar_url: string
}
