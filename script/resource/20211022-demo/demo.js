// const NodeRSA = require('node-rsa');
const crypto = require('crypto');
// const key = new NodeRSA({ b: 2048 }); //生成2048位的密钥
// let publicDer = key.exportKey('pkcs1-public-pem'); //公钥
// let privateDer = key.exportKey('pkcs1-private-pem');//私钥

const str = crypto.createHash('sha256').update('123456').digest('hex');
console.log(str);
// const path = require('path');
// const fs = require('fs');
// let publicDer = fs.readFileSync(path.join(__dirname, 'public_pem'));
// let privateDer = fs.readFileSync(path.join(__dirname, 'private_pem'));
// console.log('公钥:', publicDer);
// console.log('私钥:', privateDer);
// const text = 'Hello';
//导入私钥
// key.importKey(privateDer, 'pkcs1-private-pem');
// 加签并加密
// const sign = key.sign(text, 'base64', 'utf8');
// console.log('A 私钥加签:', sign);
// const encrypted = key.encrypt(sign, 'base64');
// console.log('B 公钥加密:', encrypted);
// 解密并验签
// const decrypted = key.decrypt(encrypted, 'utf8');
// console.log('C 私钥解密:', decrypted);
// const verify = key.verify(text, decrypted, 'utf8', 'base64');
// console.log('D 公钥验签:', verify);
// 加密
// const crypto_encrypted = crypto.publicEncrypt(publicDer, Buffer.from(text)).toString('base64');
// const crypto_encrypted = 'MDvCZAaSaMOodtUXekkzkN6MsVdh0aAkbSgxGcARyGJpjzldhT6ZWb2MyCZln1J9RDc/vXkpE8R8vDCr2bDcXELGMgOKuugcruguqwtWMxwdTQpKruh7viWdMX3yKmXoSZDR3ETGgTDmfoKCFX/xmDwnltVuYMZQdTS/kkQ8hqJ0M/UfGMn6OAmNF/yHRe2osXolOyGAZKLjOvyynNLWhehUUpNW5HEsy1hbICh+RQFebuRYW4RR5ILTlV2kxC9O3/SrSL3lHPn2Hfn4ebBSfrC/snS+n7YxHfsyNs2lR5NBECK98QmkJuVeyJox59sKSGdqtmCeOBXT5VPFjWaZFA==';
// console.log('E 公钥加密:', crypto_encrypted);
// 解密
// const crypto_decrypted = crypto.privateDecrypt({
//     undefined,
//     key: privateDer,
//     padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
// }, Buffer.from(crypto_encrypted, 'base64')).toString('utf8');
// console.log('F 私钥解密:', crypto_decrypted);
// const decrypted2 = key.decrypt(crypto_encrypted, 'utf8');
// console.log('G 私钥解密:', decrypted2);
