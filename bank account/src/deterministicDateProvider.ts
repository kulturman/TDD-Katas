import {DateProvider} from "./dateProvider";

export class DeterministicDateProvider implements DateProvider {
    currentDate!: Date;

    now(): Date {
        return this.currentDate;
    }

}
