export interface ISupplyCreate {
    userId: string, 
    benefitedId: string, 
    amount: number, 
    files: Express.MulterS3.File[] | Express.Multer.File[],
}