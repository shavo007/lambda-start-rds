import RDS from 'aws-sdk/clients/rds'
import config from './config'


class DBUtil {

  constructor(tags, instance) {
    this.tags = tags
    this.instance = instance
    this.rds = new RDS()
  }

  async startDBInstance() {
    console.log(`tags are ${JSON.stringify(this.tags.TagList)}`)
    const isStart = this.tags.TagList.find(element => element.Key === config.key && element.Value === 'true')
    console.log(`${this.instance.DBInstanceIdentifier}: to start or not.. ${JSON.stringify(isStart)}`)

    if (isStart) {
      const params = {
        DBInstanceIdentifier: `${this.instance.DBInstanceIdentifier}`, /* required */
      }
      try {
        const data = await this.rds.startDBInstance(params).promise()
        console.log(`started db instance ${this.instance.DBInstanceIdentifier},
           status is now ${data.DBInstance.DBInstanceStatus}`)
      } catch (error) {
        console.warn(`failed to start db instance ${this.instance.DBInstanceIdentifier}. error is: ${error}`)
      }
    }
  }
}

export default DBUtil
