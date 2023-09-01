import {DateProvider} from "../domain/dateProvider";

export class DeterministicDateProvider implements DateProvider {
    currentDate!: Date;

    now(): Date {
        return this.currentDate;
    }

}
