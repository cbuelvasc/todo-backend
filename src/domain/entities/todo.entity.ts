export class TodoEntity {

    constructor(
        public id: number,
        public text: string,
        public completedAt?: Date | null
    ) { }

    get isCompleted() {
        return !!this.completedAt;
    }

    public static fromObject(object: { [key: string]: any }): TodoEntity {
        const { id, text, completedAt } = object;

        if (!id) {
            throw new Error("Id is required");            
        }

        if (!text) {
            throw new Error("Text is required");            
        }

        let completedAtDate;
        if (completedAt) {
            completedAtDate = new Date(completedAt);
            if (isNaN(completedAtDate.getTime())) {
                throw new Error("Invalid completedAt date");
            }
        }
        
        return new TodoEntity(id, text, completedAtDate);
    }
}