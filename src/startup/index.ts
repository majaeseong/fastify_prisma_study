import db from "../lib/db";
import { generateHash } from "../lib/authHelper";
import { FIRST_PWD } from "../lib/constants";

const checkStartupUser = async () => {
  const pwd = FIRST_PWD as string;
  const hashPwd = generateHash(pwd);
  const userCount = await db.user.count({});

  if (userCount === 0) {
    let count = 1;
    const maxCount = 1;

    while (count <= maxCount) {
      const newUser = {
        email: `dummyUser${count++}@email.com`,
        password: hashPwd,
      };

      await db.user.create({
        data: newUser,
      });
    }

    console.log("created startup User!!!");
  }
};

/**초기 더미 데이터 생성*/
const checkStarupArticle = async () => {
  const articleCount = await db.article.count({});

  if (articleCount === 0) {
    const user = await db.user.findFirst({
      orderBy: {
        id: "asc",
      },
    });

    if (user) {
      let count = 1;
      const maxCount = 5;

      while (count <= maxCount) {
        let value = {
          content: `dummyContent_${count++}`,
          userId: user.id,
        };

        await db.article.create({
          data: value,
        });
      }

      console.log("created startup Articles!!!");
    } else {
      await checkStartupUser();
      await checkStarupArticle();
    }
  }
};

export { checkStarupArticle };
