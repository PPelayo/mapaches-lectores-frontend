export default class DataResult<TSuccess, TError> {
    readonly #success
    readonly #error
    readonly #data

    constructor(success : boolean, data? : TSuccess, error? : TError){
        this.#success = success
        this.#data = data
        this.#error = error
    }

    static createSuccess<TSuccess, TError>(data: TSuccess){
        return new DataResult(true, data, {} as TError)
    }

    static createFailure<TSucces, TError>(error : TError){
        return new DataResult(false, {} as TSucces, error)
    }


    isSuccess() {
        return this.#success
    }

    isFailure() {
        return !this.#success
    }

    getData(){
        if(!this.#success) throw new Error('The result cannot be accessed because it is not success')
        return this.#data
    }

    getError(){
        if(this.#success) throw new Error('The error cannot be accessed because it is success')
        return this.#error
    }

    toString(){
        return JSON.stringify(
            this.toJson()
        )

    }

    toJson(){
        return {
            success: this.#success,
            data : this.#data,
            error : this.#error
        }
    }

    handle(
        {
            onSuccess,
            onFailure,
            onFinally = () => {}
        } :
        {
            onSuccess : (data : TSuccess) => void,
            onFailure : (error : TError) => void,
            onFinally : () => void
        }
    ) {
        if(!this.#success){
            onFailure(this.#error!)
        } else {
            onSuccess(this.#data!)
        }
        onFinally()
    }
}