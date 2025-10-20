import { Injectable } from "@nestjs/common";
import { ItemRepository } from "./item.repository";

@Injectable()
export class ItemService {
    constructor(private readonly itemRepo: ItemRepository) { }
}