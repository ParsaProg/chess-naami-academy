export default interface OnlineTournoments{
    title: string,
    status: string,
    startTime: string,
    endTime: string,
    description: string,
    participants: number,
    ratingCategory: string,
    minRating?: number,
    maxRating?: number ,
    lichessUrl: string
}