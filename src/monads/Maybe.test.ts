import { Maybe } from "./Maybe";

type Dog = {
  age: number;
  name: string;
};

type User = {
  username: string;
  age: number;
  dog?: Dog;
};

const getNoUser = async (): Promise<User | null> => null;

const getPartialUser = async (): Promise<User | null> => ({
  username: "Nick",
  age: 12,
});
const getFullUser = async (): Promise<User | null> => ({
  username: "Nick2",
  age: 23,
  dog: { age: 1, name: "Bark" },
});

test("no user", async () => {
  const user = new Maybe(await getNoUser());
  const dog = user.run((user) => user.dog);
  const name = dog.run((dog) => dog.name);

  expect(user.value).toBe(null);
  expect(dog.value).toBe(null);
  expect(name.value).toBe(null);
});

test("partial user", async () => {
  const user = new Maybe(await getPartialUser());
  const dog = user.run((user) => user.dog);
  const name = dog.run((dog) => dog.name);

  expect(user.value).toEqual({ username: "Nick", age: 12 });
  expect(dog.value).toBeUndefined();
  expect(name.value).toBe(null);
});

test("full user", async () => {
  const user = new Maybe(await getFullUser());
  const dog = user.run((user) => user.dog);
  const name = dog.run((dog) => dog.name);

  expect(user.value).toEqual({
    username: "Nick2",
    age: 23,
    dog: { age: 1, name: "Bark" },
  });
  expect(dog.value).toEqual({ age: 1, name: "Bark" });
  expect(name.value).toBe("Bark");
});

test("full user with async", async () => {
  const user = await new Maybe(getFullUser()).vow();
  const dog = await user.run(async (user) => user.dog).vow();
  const name = await dog.run(async (dog) => dog.name).vow();

  expect(user.value).toEqual({
    username: "Nick2",
    age: 23,
    dog: { age: 1, name: "Bark" },
  });
  expect(dog.value).toEqual({ age: 1, name: "Bark" });
  expect(name.value).toBe("Bark");
});

test("full user with chain async", async () => {
  const name = await new Maybe(getFullUser())
    .vow()
    .then((user) => user.run(async (user) => user.dog).vow())
    .then((dog) => dog.run(async (dog) => dog.name).vow());

  expect(name.value).toBe("Bark");
});
