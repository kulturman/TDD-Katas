import {DateProvider} from "./dateProvider";

export class SystemDateProvider implements DateProvider {
    now(): Date {
        return new Date();
    }

}
