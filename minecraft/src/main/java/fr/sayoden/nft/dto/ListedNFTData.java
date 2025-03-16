package fr.sayoden.nft.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.math.BigInteger;

@RequiredArgsConstructor
@Getter
@ToString
public class ListedNFTData {
    private final BigInteger tokenId;
    private final String sellerAddress;
    private final BigInteger price;
}
