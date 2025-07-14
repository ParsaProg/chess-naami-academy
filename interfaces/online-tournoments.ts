export default interface OnlineTournoments{
    title: string,
    status: string,
    startTime: Date,
    endTime: Date,
    description: string,
    participants: number,
    ratingCategory: string,
    minRating?: number,
    maxRating?: number ,
    lichessUrl: string
}