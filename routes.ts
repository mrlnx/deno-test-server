
interface Dog {
    name:string
    age:number
}


let dogs:Array<Dog> =[
    {
        name: 'Roger',
        age: 8,
    },
    {
        name: 'Syd',
        age: 8,
    }
]

export const getDogs = ({response}: {response:any}) => {
    response.body = dogs;
}

export const getDog = ({
    params,
    response,
}: {
    params: {
        name: string
    }
    response: any
}) => {
    const dog = dogs.filter((dog) => dog.name === params.name);
    if(dog.length) {
        response.status  = 200;
        response.body = dog[0];
        return;
    }

    response.status = 400;
    response.body = {msg: `Cannot find dog ${params.name}`}
};

export const addDog = async({
    request,
    response,
}:{
    request: any
    response: any
}) => {
    const body = await request.body();
    const dog: Dog = body.value;
    dogs.push(dog);

    response.body = { msg: 'OK' }
    response.status = 200;
}

export const updateDog = async ({
    params,
    request,
    response,
}: {
    params: {
        name: string
    }
    request: any
    response: any
}) => {
    const temp = dogs.filter((existingDog) => existingDog.name === params.name)
    const body = await request.body();
    const { age }: { age:number } = body.value;

    if(temp.length) {
        temp[0].age = age;
        response.status = 200;
        response.body = { msg: 'OK' };
        return; 
    }

    response.status = 400;
    response.body = { msg: `Cannot find dog ${params.name}` }
}

export const removeDog = async ({
    params,
    response,
}: {
    params: {
        name: string
    }
    response: any
}) => {
    const lengthBefore = dogs.length;
    dogs = dogs.filter((dog) => dog.name !== params.name);

    if(dogs.length === lengthBefore) {
        response.status = 400;
        response.body = { msg: `Cannot find dog ${params.name}` }
        return;
    }

    response.body = { msg: 'OK' };
    response.status = 200;
}