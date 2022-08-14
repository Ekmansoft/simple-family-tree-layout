import {  Profile, ProfileLink, ProfileSex, Family, FamilyLink, createProfile  } from 'simple-family-tree-model';
import { LocalTreeBackend } from 'simple-family-tree-model';
import { expect } from 'chai';
import { generateLayout, createFamilyLayout } from '../src/index';
import 'mocha';

describe('verify tree', () => {
    let tree = new LocalTreeBackend();

    let profile1 = undefined;
    let profile2 = undefined;
    let family1 = undefined;
    //Arrange
    it('Add first profile to tree ', () => {
        //Arrange
        let newProfile1 = createProfile("Kalle Andersson", ProfileSex.Male, "19010101", "Umeå, Sweden", "19610101", "Vännäs, Sweden");

        let newProfileId1 = tree.addNewProfile(newProfile1);

        expect(newProfileId1?.itemLink).to.equal("P1");

        let newProfile2 = createProfile("Karin Andersson", ProfileSex.Female, "19020202", "Umeå, Sweden", "19620202", "Vännäs, Sweden");

        let newProfileId2 = tree.addNewProfile(newProfile2);

        expect(newProfileId2?.itemLink).to.equal("P2");

        let newProfile3 = createProfile("Child1 Andersson", ProfileSex.Male, "19010101", "Umeå, Sweden", "19610101", "Vännäs, Sweden");

        let newProfileId3 = tree.addNewProfile(newProfile3);

        expect(newProfileId3?.itemLink).to.equal("P3");

        let newProfile4 = createProfile("Child2 Andersson", ProfileSex.Female, "19020202", "Umeå, Sweden", "19620202", "Vännäs, Sweden");

        let newProfileId4 = tree.addNewProfile(newProfile4);

        expect(newProfileId4?.itemLink).to.equal("P4");

        //Arrange
        let family = new Family();

        let newFamilyId = tree.addNewFamily(family);

        expect(newFamilyId?.itemLink).to.equal("F1");

        let result2 = tree.addParentToFamily(new FamilyLink("F1"), new ProfileLink("P1"));

        expect(result2).to.equal(true);

        let result5 = tree.addParentToFamily(new FamilyLink("F1"), new ProfileLink("P2"));

        expect(result5).to.equal(true);

        let result3 = tree.addChildToFamily(new FamilyLink("F1"), new ProfileLink("P3"));

        expect(result3).to.equal(true);

        let result4 = tree.addChildToFamily(new FamilyLink("F1"), new ProfileLink("P4"));

        expect(result4).to.equal(true);

        //Arrange
        let family2 = new Family();

        let newFamilyId2 = tree.addNewFamily(family2);

        expect(newFamilyId2?.itemLink).to.equal("F2");

        let result = tree.addChildToFamily(new FamilyLink("F2"), new ProfileLink("P1"));

        //Arrange

        let newProfile5 = createProfile("Thelma Andersson", ProfileSex.Female, "18830303", "Umeå, Sweden", "19230303", "Vännäs, Sweden");

        let newProfileId5 = tree.addNewProfile(newProfile5);

        expect(newProfileId5?.itemLink).to.equal("P5");

        let result6 = tree.addParentToFamily(new FamilyLink("F2"), new ProfileLink("P5"));

        let newProfile6 = createProfile("Harry Andersson", ProfileSex.Male, "18830303", "Umeå, Sweden", "19230303", "Vännäs, Sweden");

        let newProfileId6 = tree.addNewProfile(newProfile6);

        expect(newProfileId6?.itemLink).to.equal("P6");

        let result7 = tree.addParentToFamily(new FamilyLink("F2"), new ProfileLink("P6"));

        expect(result7).to.equal(true);

        let mainLayout = createFamilyLayout(tree, newProfileId1, 1, 1);

        console.log(mainLayout);

        expect(mainLayout.families.size).to.equal(2);
        expect(mainLayout.profiles.size).to.equal(6);
        let resultingLayout = generateLayout(mainLayout)
        console.log(resultingLayout);
        expect(resultingLayout.length).to.equal(8);
    })

});