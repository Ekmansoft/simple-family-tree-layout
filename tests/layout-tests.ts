import {  Profile, ProfileLink, ProfileSex, Family, FamilyLink, createProfile  } from 'simple-family-tree-model';
import { LocalTreeBackend } from 'simple-family-tree-model';
import { expect } from 'chai';
import { generateVerticalTreeLayout, createFamilyLayout } from '../src/index';
import 'mocha';
import { generateProfileList } from '../src/generate-profile-list';

function createAndAddProfile(
    tree: LocalTreeBackend,
    name: string,
    sex: ProfileSex,
    birthDate: string,
    birthPlace: string,
    deathDate: string,
    deathPlace: string,
  ) {
    const profile = new Profile();
    profile.name = name;
    profile.sex = sex;
    profile.birthDate = birthDate;
    profile.birthPlace = birthPlace;
    profile.deathDate = deathDate;
    profile.deathPlace = deathPlace;
    return tree.addNewProfile(profile);
  }


describe('verify tree', () => {
    let tree = new LocalTreeBackend();

    let profile1 = undefined;
    let profile2 = undefined;
    let family1 = undefined;

    let rootProfile: ProfileLink|undefined = undefined;
    //Arrange
    it('Add family tree for layout tests ', () => {
        //Arrange
        let newProfileId1 = createAndAddProfile(tree, "Kalle Andersson", ProfileSex.Male, "19010101", "Umeå, Sweden", "19610101", "Vännäs, Sweden");

        expect(newProfileId1?.itemLink).to.equal("P1");

        rootProfile = newProfileId1;

        let newProfileId2 = createAndAddProfile(tree, "Karin Andersson", ProfileSex.Female, "19020202", "Umeå, Sweden", "19620202", "Vännäs, Sweden");

        expect(newProfileId2?.itemLink).to.equal("P2");

        let newProfileId3 = createAndAddProfile(tree, "Child1 Andersson", ProfileSex.Male, "19010101", "Umeå, Sweden", "19610101", "Vännäs, Sweden");

        expect(newProfileId3?.itemLink).to.equal("P3");

        let newProfileId4 = createAndAddProfile(tree, "Child2 Andersson", ProfileSex.Female, "19020202", "Umeå, Sweden", "19620202", "Vännäs, Sweden");

        expect(newProfileId4?.itemLink).to.equal("P4");

        //Arrange
        let newFamilyId = tree.addNewFamily(new Family());

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
        let newFamilyId2 = tree.addNewFamily(new Family());

        expect(newFamilyId2?.itemLink).to.equal("F2");

        let result = tree.addChildToFamily(new FamilyLink("F2"), new ProfileLink("P1"));

        //Arrange

        {
            let newProfileId5 = createAndAddProfile(tree, "Thelma Andersson", ProfileSex.Female, "18830303", "Umeå, Sweden", "19230303", "Vännäs, Sweden");

            expect(newProfileId5?.itemLink).to.equal("P5");

            let result6 = tree.addParentToFamily(new FamilyLink("F2"), new ProfileLink("P5"));

            let newProfileId6 = createAndAddProfile(tree, "Harry Andersson", ProfileSex.Male, "18830303", "Umeå, Sweden", "19230303", "Vännäs, Sweden");

            expect(newProfileId6?.itemLink).to.equal("P6");

            let result7 = tree.addParentToFamily(new FamilyLink("F2"), new ProfileLink("P6"));

            expect(result7).to.equal(true);
        }
        {
            let newFamilyId3 = tree.addNewFamily(new Family());

            expect(newFamilyId3?.itemLink).to.equal("F3");

            let result = tree.addChildToFamily(new FamilyLink("F3"), new ProfileLink("P2"));

            let newProfileId5 = createAndAddProfile(tree, "Harriet Andersson", ProfileSex.Female, "18830303", "Umeå, Sweden", "19230303", "Vännäs, Sweden");

            expect(newProfileId5?.itemLink).to.equal("P7");

            let result6 = tree.addParentToFamily(new FamilyLink("F3"), new ProfileLink("P7"));

            let newProfileId6 = createAndAddProfile(tree, "Super-Harry Andersson", ProfileSex.Male, "18830303", "Umeå, Sweden", "19230303", "Vännäs, Sweden");

            expect(newProfileId6?.itemLink).to.equal("P8");

            let result7 = tree.addParentToFamily(new FamilyLink("F3"), new ProfileLink("P8"));

            expect(result7).to.equal(true);
        }

    })
    it('Test layout 1', () => {
        if (rootProfile != undefined) {
            let mainLayout = createFamilyLayout(tree, rootProfile, 1, 1);

            //console.log(mainLayout);

            expect(mainLayout.families.size).to.equal(3);
            expect(mainLayout.profiles.size).to.equal(8);
            let resultingLayout = generateVerticalTreeLayout(mainLayout)
            //console.log(resultingLayout);
            expect(resultingLayout.length).to.equal(11);
        }
    })
    it('Test layout 2', () => {
        let profileListLayout = generateProfileList(tree);

        // console.log("pre");
        //console.log(profileListLayout.props.children.props.children);
        //console.log(profileListLayout.props.children.length);
        // console.log("post");

        expect(profileListLayout.props.children.props.children.length).to.equal(2);
        // console.log("pre");
        // console.log(profileListLayout.props.children[0].props);
        // console.log("post");
        // console.log("pre");
        // console.log(profileListLayout.props.children[1].props.children[1]);
        // console.log("post");
        // console.log("pre");
        // console.log(profileListLayout.props.children[1].props.children[1].props.children);
        // console.log("post");
        // console.log("pre");
        // console.log(profileListLayout.props.children.props.children[1].props.children.length);
        // console.log("post");

        expect(profileListLayout.props.children.props.children[0].type).to.equal('thead');
        expect(profileListLayout.props.children.props.children[1].type).to.equal('tbody');

        expect(profileListLayout.props.children.props.children[1].props.children.length).to.equal(8);
    })

});