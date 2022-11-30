//return  query1.data.nfts
let ownerDataArray = ownerQuery.data.ownerAddresses
let nftDataArray = nftQuery1.data.nfts
let nftDataArray2 = nftQuery2.data.nfts
let resultRows = [];
if (ownerDataArray.length == 0)
   return []

/*_.each(ownerDataArray, function(target) {
    // do processing and push to resultRows
    let obj = [target.ownerAddress, 1];
    resultRows.push(obj)
  });*/

_.each(ownerDataArray, function (target) {

   let tokenBalancesArray = target.tokenBalances;
   let ownerAddress = target.ownerAddress;

   _.each(tokenBalancesArray, function (innerTarget) {
      // do processing and push to resultRows
      let tokenIdHex = innerTarget.tokenId;
      let tokenId = parseInt(tokenIdHex, 16);

      if (tokenId < 101) {
         _.each(nftDataArray, function (nftData) {
            // do processing and push to resultRows
            if (tokenId === parseInt(nftData.id.tokenId, 16)) {
               let types = nftData.metadata.attributes;
               let typeName = '';
               _.each(types, function (type) {
                  // do processing and push to resultRows
                  typeName = type.value;
               });

               let obj = [nftData.contract.address, tokenIdHex, tokenId, typeName, nftData.title, nftData.metadata.image, nftData.metadata.animation_url, ownerAddress];
               resultRows.push(obj)
               return;
            }
         });

      } else {
         _.each(nftDataArray2, function (nftData) {
            // do processing and push to resultRows
            if (tokenId === parseInt(nftData.id.tokenId, 16)) {
               let types = nftData.metadata.attributes;
               let typeName = '';
               _.each(types, function (type) {
                  // do processing and push to resultRows
                  typeName = type.value;
               });

               let obj = [nftData.contract.address, tokenIdHex, tokenId, typeName, nftData.title, nftData.metadata.image, nftData.metadata.animation_url, ownerAddress];
               resultRows.push(obj)
               return;
            }
         });

      }

   });

});

return resultRows
