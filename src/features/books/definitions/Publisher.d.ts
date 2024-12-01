import Entity from "@/core/definitinos/Entity";

export interface Publisher extends Entity {
    createdAt: string,
    updatedAt: string,
    itemUuid: string,
    name: string
}

export interface CreatePublisherRequest {
    name : string
}