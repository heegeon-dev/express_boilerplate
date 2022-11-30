const config = require("config");
let models = require(`../sequelize/models`);
module.exports = {
    checkRequestCount: (user_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let cnt = await models.request.count({
                    include: [
                        {
                            model: models.request_folder,
                            where: {
                                user_id: user_id,
                            },
                        },
                    ],
                });
                //TODO: 유료회원/무료회원을 분리하여 인재요청 수에 따라 분기해야함
                //현재는 무료회원 제한만 걸어놓음
                if (
                    cnt >=
                    config.get(
                        `${process.env.NODE_ENV}.business_model.talentCnt`
                    )
                ) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            } catch (error) {
                reject(error);
            }
        });
    },
};
