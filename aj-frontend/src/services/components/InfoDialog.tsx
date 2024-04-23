import Dialog from "../../components/Dialog";

export default function InfoDialog({ onClose }: { onClose: () => void }) {
  return (
    <Dialog heading="The Asylum Journey Tool" onClose={onClose}>
      <p>
        The Asylum Journey is a tool that shows the different services available
        for refugees and asylum seekers, organised according to the different
        stages of the asylum process from first arrival in the city to refugee
        status and beyond. The information can also be filtered by categories
        such as legal advice, housing, or education. Gaps in service and
        services at risk are highlighted.
      </p>
      <h2 className="filter-info-heading border-stage-1">Arrival</h2>
      <p>
        Services for people newly arrived in Sheffield, including information
        about making an asylum claim and information for new claimants.
      </p>
      <h2 className="filter-info-heading border-stage-2">Awaiting Decision</h2>
      <p>
        Services for people who have made an asylum claim and are awaiting a
        decision from the Home Office.
      </p>
      <h2 className="filter-info-heading border-stage-3">Positive Decision</h2>
      <p>
        Services for people who have been granted leave to remain and have
        recourse to public funds and support.
      </p>
      <h2 className="filter-info-heading border-stage-4">
        Positive Decision - No recourse to public funds
      </h2>
      <p>
        Services for people who have been granted leave to remain, but have been
        denied access to public funds and support.
      </p>
      <h2 className="filter-info-heading border-stage-5">
        Negative Decision with state support
      </h2>
      <p>
        Services for people who have had their asylum claim refused but are
        still eligible for state support, for example families with children,
        unaccompanied children, or vulnerable adults.
      </p>
      <h2 className="filter-info-heading border-stage-6">
        Negative Decision - Destitute
      </h2>
      <p>
        Services for people who have had their asylum claim refused and have no
        access to public funds or support.
      </p>
      <h2 className="filter-info-heading border-stage-7">
        Gateway Protection Programme/Syrian Resettlement Programme
      </h2>
      <p>
        Services for people who moved to Sheffield under the Gateway Protection
        Programme or the Syrian Resettlement Programme and have already been
        granted refugee status.
      </p>
    </Dialog>
  );
}
