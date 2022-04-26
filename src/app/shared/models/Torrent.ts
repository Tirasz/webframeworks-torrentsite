

export interface Torrent{
    id: string,
    date_added: Date
    uploaderId: string,
    name: string,
    seeders: number,
    leechers: number,
    category: "Software" | "Movie" | "Video game" | "Book" | "XXX", 
}