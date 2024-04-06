export class UpdateTodoDTO {

    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ) { }

    get values() {
        const returnObject: { [key: string]: any } = {};
        if (this.text) {
            returnObject.text = this.text;
        }
        if (this.completedAt) {
            returnObject.completedAt = this.completedAt;
        }
        return returnObject;
    }

    static update(props: { [key: string]: any }): [string?, UpdateTodoDTO?] {
        const { id, text, completedAt } = props;
        let newCompletedAt = completedAt;

        if (!id || isNaN(Number(id))) {
            return ["Id must be a valid number"];
        }

        if (completedAt) {
            const completedAtDate = new Date(completedAt);
            if (completedAtDate.toString() === "Invalid Date") {
                return ["Invalid completedAt date"];
            }
        }

        return [undefined, new UpdateTodoDTO(id, text, newCompletedAt)];
    }
}